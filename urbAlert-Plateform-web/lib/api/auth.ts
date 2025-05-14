"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  deleteUser,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "../firebase";

// Types for user data
export type UserRole = "user" | "admin";

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  role: UserRole;
  createdAt: any;
  lastLogin: any;
}

// User registration
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create user document in Firestore
    const userData: UserData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name,
      photoURL: null,
      phoneNumber: null,
      role: "user",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    };

    await setDoc(doc(db, "users", userCredential.user.uid), userData);

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// User login
export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update last login time
    await updateDoc(doc(db, "users", userCredential.user.uid), {
      lastLogin: serverTimestamp(),
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Google sign-in
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Check if user exists in Firestore, if not, create a new user document
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber,
        role: "user",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };

      await setDoc(userDocRef, userData);
    } else {
      // Update last login time
      await updateDoc(userDocRef, {
        lastLogin: serverTimestamp(),
      });
    }

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// User logout
export const logoutUser = async (): Promise<void> => {
  return signOut(auth);
};

// Password reset
export const resetUserPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Get current user data from Firestore
export const getCurrentUserData = async (
  user: User
): Promise<UserData | null> => {
  if (!user) return null;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  user: User,
  data: { displayName?: string; photoURL?: string; phoneNumber?: string }
): Promise<void> => {
  if (!user) throw new Error("User not authenticated");

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

// Update user email
export const updateUserEmail = async (
  user: User,
  currentPassword: string,
  newEmail: string
): Promise<void> => {
  if (!user) throw new Error("User not authenticated");
  if (!user.email) throw new Error("User has no email to update");

  try {
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update email in Auth
    await updateEmail(user, newEmail);

    // Update email in Firestore
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      email: newEmail,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (
  user: User,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  if (!user) throw new Error("User not authenticated");
  if (!user.email) throw new Error("User has no email for reauthentication");

  try {
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
  } catch (error) {
    throw error;
  }
};

// Delete user account
export const deleteUserAccount = async (
  user: User,
  password: string
): Promise<void> => {
  if (!user) throw new Error("User not authenticated");
  if (!user.email) throw new Error("User has no email for reauthentication");

  try {
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Delete user data from Firestore
    await deleteDoc(doc(db, "users", user.uid));

    // Delete user from Authentication
    await deleteUser(user);
  } catch (error) {
    throw error;
  }
};

// Get all users (admin function)
export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    // Check if current user is admin
    const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (!currentUserDoc.exists() || currentUserDoc.data().role !== "admin") {
      throw new Error("Unauthorized access: Admin privileges required");
    }

    // Get all users
    const usersQuery = query(collection(db, "users"));
    const querySnapshot = await getDocs(usersQuery);

    const users: UserData[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      users.push(doc.data() as UserData);
    });

    return users;
  } catch (error) {
    throw error;
  }
};

// Update user role (admin function)
export const updateUserRole = async (
  userId: string,
  newRole: UserRole
): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    // Check if current user is admin
    const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (!currentUserDoc.exists() || currentUserDoc.data().role !== "admin") {
      throw new Error("Unauthorized access: Admin privileges required");
    }

    // Update user role
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      role: newRole,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

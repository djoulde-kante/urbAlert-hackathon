"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

type UserData = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  role: "user" | "admin";
  createdAt: any;
  lastLogin: any;
};

interface AuthContextProps {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setUser(user);

      if (user) {
        // Get additional user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }

        // Update last login time
        await setDoc(
          userDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with displayName
      await updateProfile(result.user, {
        displayName: name,
      });

      // Send email verification with custom configuration
      await sendEmailVerification(result.user, {
        url: `${window.location.origin}/connexion?email=${email}`,
        handleCodeInApp: true,
      });

      // Create user document in Firestore
      const userData: UserData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name,
        photoURL: null,
        phoneNumber: null,
        role: "user",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };

      await setDoc(doc(db, "users", result.user.uid), userData);
    } catch (error) {
      throw error;
    }
  };  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    if (!result.user.emailVerified) {
      // Send a new verification email if needed
      await sendEmailVerification(result.user, {
        url: `${window.location.origin}/connexion?email=${email}`,
        handleCodeInApp: true,
      });
      throw new Error("Email non vérifié. Un nouvel email de vérification a été envoyé.");
    }
    return result;
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user document exists, if not create one
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const userData: UserData = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          phoneNumber: result.user.phoneNumber,
          role: "user",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        };

        await setDoc(userDocRef, userData);
      } else {
        // Update last login time
        await setDoc(
          userDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!user) return;

    try {
      await updateProfile(user, data);

      // Update Firestore user data
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, data, { merge: true });

      // Refresh user data
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    userData,
    loading,
    register,
    login,
    logout,
    resetPassword,
    googleSignIn,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

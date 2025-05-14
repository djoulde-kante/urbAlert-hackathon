import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsLWtHr0SzgT4bSvLqetWOVkH50CxS_rU",
  authDomain: "urbalert-50e66.firebaseapp.com",
  projectId: "urbalert-50e66",
  storageBucket: "urbalert-50e66.firebasestorage.app",
  messagingSenderId: "348088149008",
  appId: "1:348088149008:web:1a9ce644664b0c22041695",
  measurementId: "G-0Z38QWF6K5",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

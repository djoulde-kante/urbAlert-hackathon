const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const { getAuth } = require("firebase/auth");
const admin = require("firebase-admin");

// Firebase client configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsLWtHr0SzgT4bSvLqetWOVkH50CxS_rU",
  authDomain: "urbalert-50e66.firebaseapp.com",
  projectId: "urbalert-50e66",
  storageBucket: "urbalert-50e66.firebasestorage.app",
  messagingSenderId: "348088149008",
  appId: "1:348088149008:web:1a9ce644664b0c22041695",
  measurementId: "G-0Z38QWF6K5",
};

// Initialize Firebase client
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Initialize Firebase Admin (for server-side operations)
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseConfig.projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
    }),
    storageBucket: firebaseConfig.storageBucket,
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();
const adminStorage = admin.storage();

module.exports = {
  app,
  db,
  storage,
  auth,
  admin,
  adminDb,
  adminAuth,
  adminStorage,
};

// firebase-config.js
import { initializeApp } from "firebase/app";
//Firebase Firestore
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  updateDoc,
  query,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  updatePassword as authUpdatePassword,
} from "firebase/auth";

// Firestore Storage
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

// Importing Firebase Keys
import firebaseKeys from "./conf.js";

const firebaseConfig = {
  apiKey: firebaseKeys.apiKey,
  authDomain: firebaseKeys.authDomain,
  projectId: firebaseKeys.projectId,
  storageBucket: firebaseKeys.storageBucket,
  messagingSenderId: firebaseKeys.messagingSenderId,
  appId: firebaseKeys.appId,
  databaseURL: firebaseKeys.VITE_DATABASEURL,
  measurementId: firebaseKeys.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Export Firebase services and utilities
export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  collection,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  storage,
  authUpdatePassword as updatePassword,
  getDownloadURL,
  uploadBytesResumable,
  updateDoc,
  addDoc,
  query,
  deleteDoc,
  ref,
};

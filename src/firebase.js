
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYizxwP4LOwp-mgCR3gUo117tFmGIJA8A",
  authDomain: "refresh-90174.firebaseapp.com",
  projectId: "refresh-90174",
  storageBucket: "refresh-90174.firebasestorage.app",
  messagingSenderId: "160130501966",
  appId: "1:160130501966:web:d2ab5ad9727eac9e6f221f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
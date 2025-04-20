// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ← this is needed!
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAEAJVhPpaLMX0fVIjb4UvWOKCMsuvuUdo",
  authDomain: "blogpost-283d6.firebaseapp.com",
  projectId: "blogpost-283d6",
  storageBucket: "blogpost-283d6.appspot.com", // ← FIXED the typo here!
  messagingSenderId: "424699025452",
  appId: "1:424699025452:web:72f96ed56b96aa7e66d989",
  measurementId: "G-1VR2M2FVHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // ← This makes `db` available to use in your BlogPost.jsx


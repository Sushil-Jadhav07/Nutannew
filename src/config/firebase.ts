// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfXMTL7VGr6RbWDPSvOdQXB_-RUCZS16s",
  authDomain: "nutandev-f7518.firebaseapp.com",
  projectId: "nutandev-f7518",
  storageBucket: "nutandev-f7518.firebasestorage.app",
  messagingSenderId: "678295692148",
  appId: "1:678295692148:web:fa2586cb20bebf23b20221",
  measurementId: "G-KVHB2KW8NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
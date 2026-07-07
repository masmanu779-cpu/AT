import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALrwuCEB4RcqclT8ifzd7Onh1YwWyqUHY",
  authDomain: "ai-siudio-94265.firebaseapp.com",
  projectId: "ai-siudio-94265",
  storageBucket: "ai-siudio-94265.firebasestorage.app",
  messagingSenderId: "923935340348",
  appId: "1:923935340348:web:99e7a482617a60981a1039",
  measurementId: "G-T83Q7XZ83C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

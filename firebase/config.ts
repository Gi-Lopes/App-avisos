// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAF9Cm-2XQI2uX2lpq9lvwKy0n39ZrPTzc",
  authDomain: "app-mobile-de-avisos-68450.firebaseapp.com",
  projectId: "app-mobile-de-avisos-68450",
  storageBucket: "app-mobile-de-avisos-68450.firebasestorage.app",
  messagingSenderId: "561215482832",
  appId: "1:561215482832:android:d1b50c2df4c4864ece27d5",
};

// Inicializa o Firebase
export const app = initializeApp(firebaseConfig);

// Exporta Firestore e Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

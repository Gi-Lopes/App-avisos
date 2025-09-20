// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//depois
import { getAuth } from "firebase/auth";

// Configuração Firebase (Web)
const firebaseConfig = {
  apiKey: "AIzaSyAF9Cm-2XQI2uX2lpq9lvwKy0n39ZrPTzc", // do google-services.json (Android)
  authDomain: "app-mobile-de-avisos-68450.firebaseapp.com", // derivado do project_id
  projectId: "app-mobile-de-avisos-68450",
  storageBucket: "app-mobile-de-avisos-68450.firebasestorage.app",
  messagingSenderId: "561215482832", // project_number
  appId: "1:561215482832:android:d1b50c2df4c4864ece27d5", // mobilesdk_app_id (Android)
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);

//depois
export const auth = getAuth(app);
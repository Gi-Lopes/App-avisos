//funcoes de login
import { auth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Registro de usuário
export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

// Login de usuário
export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

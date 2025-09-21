// firebase/auth.ts
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export async function loginWithGoogle(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  const userCredential = await signInWithCredential(auth, credential);
  return userCredential.user;
}

// context/AuthContext.tsx
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth"; // seu auth do firebase

WebBrowser.maybeCompleteAuthSession();

export type AppUser = {
  uid?: string;
  displayName: string | null;
  email: string | null;
  token?: string;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Inicializa o listener do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
        });
        // Redireciona automaticamente se o usuário estiver logado
        router.replace("/(tabs)");
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Login com Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: "561215482832-oe3urjlchbmrj131qm3gu4kcsd0ipl0m.apps.googleusercontent.com",
    iosClientId: "561215482832-0odavclro8tpdgdqib4ur7ef81qjd1a6.apps.googleusercontent.com",
    webClientId: "561215482832-pflnnl8v3o2f3gie0gku2t66e1peo8lh.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [response]);

  const signInWithGoogle = async () => {
    await promptAsync();
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/Login"); // volta para login
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

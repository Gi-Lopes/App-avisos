import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { loginWithGoogle } from "../firebase/auth"; // 🔑 função que já criamos

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();


  // Se já estiver logado, pula para a tela de tabs
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={signInWithGoogle}
      >
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#127e3f",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "#127e3f",
    fontSize: 16,
    fontWeight: "600",
  },
});

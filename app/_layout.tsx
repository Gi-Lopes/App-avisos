import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { AvisosProvider } from "../context/ContextoAvisos";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AvisosProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" />
          <Stack.Screen name="add" />
          <Stack.Screen name="(tabs)" />
          
        </Stack>
      </AvisosProvider>
    </AuthProvider>
  );
}


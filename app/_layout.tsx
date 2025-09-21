// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { AvisosProvider } from "../context/ContextoAvisos";
import { ActivityIndicator, View } from "react-native";

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="add" />
        </>
      ) : (
        <Stack.Screen name="Login" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AvisosProvider>
        <AppNavigator />
      </AvisosProvider>
    </AuthProvider>
  );
}

import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#127e3f",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Avisos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cube" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

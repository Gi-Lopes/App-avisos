import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";

//depois
import { loginUser, registerUser } from "../firebase/auth";


export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const {setIsLoggedIn} = useAuth();

  
  const login = () => {

    // Para teste rápido, qualquer usuário/senha permite login
    setIsLoggedIn(true);
    router.replace("/"); // substitui a tela atual
  };

  return (
    <View style={{ 
      flex: 1, 
      padding: 20, 
      justifyContent: "center",
      // alignItems: "center",
      backgroundColor: "#127e3f" }}>
      <View
        style={{
          flexDirection: "row", //organiza os filhos na horizontal
          alignItems: "center", //alinha verticamente
          justifyContent: "center", //centraliza horizontalmente
          marginBottom: 30,
        }}
      >
        
        <MaterialCommunityIcons 
          name="cube-outline" 
          size={200} 
          color="#fcf5e5"
          style ={{marginRight: 15}}//espaco entre o cubo e o texto
          />
        <Text style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#fcf5e5",
            textShadowColor: "#000908",
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 4,
          }}>

          PET Computação{"\n"} Avisos
        </Text>

      </View>
      <Text style={{ fontSize: 24, 
        fontWeight: "bold", 
        color: "#fcf5e5", 
        marginBottom: 20, 
        textShadowColor: "#000", 
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 3,
      }}>Login</Text>

      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={{ backgroundColor: "#fcf5e5", padding: 12, borderRadius: 8, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ backgroundColor: "#fcf5e5", padding: 12, borderRadius: 8, marginBottom: 20 }}
      />

      <TouchableOpacity
        style={{ backgroundColor: "#57ba48", padding: 15, borderRadius: 8, alignItems: "center" }}
        onPress={login}
      >
        <Text style={{ 
          color: "#fcf5e5", 
          fontWeight: "bold",
          textShadowColor: "#000", 
          textShadowOffset: {width: 2, height: 2},
          textShadowRadius: 3,
          
          }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

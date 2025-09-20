import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAvisos } from "../../context/ContextoAvisos";

export default function AvisosScreen() {
  const { avisos, removeAviso } = useAvisos();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#127e3f" }}>
      {/* Cabeçalho */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <MaterialCommunityIcons name="cube" size={40} color="#fcf5e5" />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 8, color: "#fcf5e5" }}>
          Avisos
        </Text>
      </View>

      {/* Lista de avisos */}
      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fcf5e5",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            {/*titulo do aviso e botao de excluir*/}
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>

              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.titulo}</Text>
              <TouchableOpacity
                style={{  padding: 5, borderRadius: 6 }}
                onPress={() => removeAviso(item.id)}
              >
                <Text style={{ color: "#d6382a", fontWeight: "bold" }}> 🗑️Excluir</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: "#555" }}>{item.descricao}</Text>
            <Text style={{ color: "#888", marginTop: 5 }}>
              {item.data.toLocaleDateString()}
            </Text>

            {/*botao editar*/}
            <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
              <TouchableOpacity
                style={{ backgroundColor: "#57ba48", padding: 8, borderRadius: 6 }}
                onPress={() => router.push({ pathname: "/add", params: { id: item.id } })}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão para adicionar */}
      <TouchableOpacity
        style={{
          backgroundColor: "#fcf5e5",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => router.push("/add")}
      >
        <Text style={{ color: "#000908", fontSize: 16, fontWeight: "bold" }}>
          + Adicionar Aviso
        </Text>
      </TouchableOpacity>
    </View>
  );
}

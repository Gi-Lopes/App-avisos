import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAvisos } from "../context/ContextoAvisos";
import { auth } from "../firebase/auth"; // importa auth do Firebase

export default function AddAvisoScreen() {
  const { avisos, addAviso, editarAviso } = useAvisos();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const params = useLocalSearchParams() as { id?: string };
  const id = params.id;

  const userUid = auth.currentUser?.uid;

  // Preenche campos para edição
  useEffect(() => {
    if (id) {
      const avisoExistente = avisos.find((a) => a.id === id);
      if (avisoExistente) {
        if (avisoExistente.uid !== userUid) {
          Alert.alert("Atenção", "Você só pode editar seus próprios avisos.");
          router.back();
          return;
        }
        setTitulo(avisoExistente.titulo);
        setDescricao(avisoExistente.descricao);
        setData(avisoExistente.data); // já é Date
      }
    }
  }, [id, avisos, userUid]);

  const salvarAviso = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha título e descrição.");
      return;
    }

    try {
      if (id) {
        // Edição
        await editarAviso(id, { titulo, descricao, data });
      } else {
        // Criação
        if (!userUid) {
          Alert.alert("Erro", "Usuário não autenticado.");
          return;
        }
        await addAviso(titulo, descricao, userUid, data);
      }
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o aviso.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#127e3f" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fcf5e5", marginBottom: 10 }}>
        {id ? "Editar Aviso" : "Novo Aviso"}
      </Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }}
      >
        <Text>{data.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <TouchableOpacity
        style={{ backgroundColor: "#fcf5e5", padding: 15, borderRadius: 8, alignItems: "center" }}
        onPress={salvarAviso}
      >
        <Text style={{ color: "#000908", fontSize: 16, fontWeight: "bold" }}>
          Salvar Aviso
        </Text>
      </TouchableOpacity>
    </View>
  );
}

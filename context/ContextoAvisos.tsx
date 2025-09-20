// context/ContextoAvisos.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

type Aviso = {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
};

type ContextType = {
  avisos: Aviso[];
  addAviso: (titulo: string, descricao: string) => Promise<void>;
  removeAviso: (id: string) => Promise<void>;
};

const AvisosContext = createContext<ContextType | undefined>(undefined);

export const AvisosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useEffect(() => {
    // referência à coleção avisos
    const q = query(collection(db, "avisos"), orderBy("data", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: Aviso[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          titulo: data.titulo,
          descricao: data.descricao,
          data: data.data instanceof Timestamp ? data.data.toDate() : new Date(),
        };
      });
      setAvisos(lista);
    });

    return () => unsubscribe();
  }, []);

  const addAviso = async (titulo: string, descricao: string) => {
    await addDoc(collection(db, "avisos"), {
      titulo,
      descricao,
      data: new Date(),
    });
  };

  const removeAviso = async (id: string) => {
    await deleteDoc(doc(db, "avisos", id));
  };

  return (
    <AvisosContext.Provider value={{ avisos, addAviso, removeAviso }}>
      {children}
    </AvisosContext.Provider>
  );
};

export const useAvisos = () => {
  const context = useContext(AvisosContext);
  if (!context) throw new Error("useAvisos deve ser usado dentro de AvisosProvider");
  return context;
};

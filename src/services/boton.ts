"use server";

import { supabase } from '../lib/supabase';

// Función para obtener el valor inicial del contador
const fetchData = async () => {
  const { data, error } = await supabase.from("Numero").select("valor").eq("id", 1).single();
  if (error) {
    console.error("Error fetching data:", error);
    return { valor: 0 }; // Valor por defecto en caso de error
  }
  return data;
};

// Función para actualizar el valor del contador en la base de datos
const updateData = async (newValue: number) => {
  const { data, error } = await supabase.from("Numero").update({ valor: newValue }).eq("id", 1);
  if (error) {
    console.error("Error updating data:", error);
  }
  return data;
};

export { fetchData, updateData };
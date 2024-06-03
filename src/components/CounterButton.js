"use client";

import { useEffect, useState } from 'react';
import { fetchData, updateData } from '../services/boton';



const Contador = () => {
    const [count, setCount] = useState(0);
  
    // Función para incrementar el contador y actualizar la base de datos
    const increment = async () => {
      const newCount = count + 1;
      setCount(newCount);
      await updateData(newCount);
    };
  
    // Obtener el valor inicial del contador de la base de datos
    useEffect(() => {
      const getCount = async () => {
        const data = await fetchData();
        if (data && data.valor !== undefined) {
          setCount(data.valor);
        }
      };
      getCount();
    }, []);
  
    // Función para obtener el valor del contador de la base de datos
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('counter')
        .select('count')
        .eq('id', 1)
        .single();
      if (error) {
        console.error('Error fetching counter:', error);
        return null;
      }
      return { valor: data.count };
    };
  
    // Función para actualizar el valor del contador en la base de datos
    const updateData = async (newCount) => {
      const { data, error } = await supabase
        .from('counter')
        .update({ count: newCount })
        .eq('id', 1);
      if (error) {
        console.error('Error updating counter:', error);
        return null;
      }
      return data;
    };
   



  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl mb-4">Counter: {count}</h1>
      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Increment
      </button>
    </div>
  );
}
export default Contador;


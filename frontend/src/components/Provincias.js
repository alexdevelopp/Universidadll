import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProvinciasComponent = () => {
  // Estado para almacenar la lista de provincias
  const [provincias, setProvincias] = useState([]);

  // Efecto para realizar la solicitud al cargar el componente
  useEffect(() => {
    // Función para obtener la lista de provincias
    const fetchProvincias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/provincias');
        // Actualizar el estado con la lista de provincias
        setProvincias(response.data);
        console.log(provincias)
      } catch (error) {
        console.error('Error al obtener la lista de provincias:', error);
      }
    };

    // Llamar a la función para obtener las provincias
    fetchProvincias();
  },); 

  return (
    <div>
      <h2>Lista de Provincias</h2>
      <ul>
        {provincias.map(provincia => (
          <li key={provincia.id}>{provincia.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProvinciasComponent;

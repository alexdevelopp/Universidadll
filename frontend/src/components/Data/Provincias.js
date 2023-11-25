import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'
import FormProvincia from '../Forms/FormProvincia';


const ProvinciasComponent = () => {
  // Estado para almacenar la lista de provincias
  const [provincias, setProvincias] = useState([]);

    // Función para obtener la lista de provincias
    const getAllProvincias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/provincias');
        // Actualizar el estado con la lista de provincias
        setProvincias(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de provincias:', error);
      }
    };

  // Efecto para realizar la solicitud al cargar el componente
  useEffect(() => {
    // Llamar a la función para obtener las provincias
    getAllProvincias();
  },[]); 

  //Funcion para solicitar borrar una provincia.
  const deleteProvincia = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:8080/api/provincias/${id}`);
      // Eliminación exitosa en la base de datos, actualiza el estado
      const nuevasProvincias = provincias.filter(provincia => provincia.id !== id);
      setProvincias(nuevasProvincias);
      console.log('Provincia eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la provincia:', error);
    }
  };

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'nombre', name: 'Nombre'}
  ];

  const rows = provincias.map(provincia => ({
    id: provincia.id,
    nombre: provincia.nombre
  }));



  return (
    <div className='grid-container'>
    <h2 className='title-grid'>Lista de Provincias</h2>
    <div className="grid-wrapper">
      <table className="my-grid">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.name}</th>
            ))}
            <th></th> 
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              {columns.map(column => (
                <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>
              ))}
              <td>
                <button onClick={() => deleteProvincia(row.id)} className="eliminar">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <FormProvincia getAllProvincias={getAllProvincias} />
  </div>
  );
};

export default ProvinciasComponent;

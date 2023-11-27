import React, {useEffect} from 'react';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'




const GridProvincias = ({service,provincias,setProvincias,provinciaToEdit,setProvinciaToEdit,isEditing,setIsEditing}) => {
 

  useEffect(() => {
    const updateGrid = async () => {
      try {
        const data = await service.getAll('api/provincias');
        setProvincias(data)
      } catch (error) {
        console.error('Error al cargar provincias:', error);
      }
    };
    updateGrid();
  }, [setProvincias]);

  const deleteProvincia = async (id) => {
    try {
      await service.delete('api/provincias',id);
      //Actualizar lista de provincias sin la eliminada
      const updatedProvincias = provincias.filter((provincia) => provincia.id !== id);
      setProvincias(updatedProvincias);
    } catch (error) {
      console.error('Error al eliminar provincias:', error);
    }
  }
  

  // Cuando le damos a modificar en el grid
  const handleEdit = (id) => {
    const provincia = provincias.find((provincia) => provincia.id === id);
    setProvinciaToEdit(provincia);
    setIsEditing(true);
  };

  //Mostrar datos en el grid
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
              <td>
            <button onClick={() => handleEdit(row.id)} className="edit-item">
              Modificar
            </button>
          </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default GridProvincias;

import React, {useEffect} from 'react';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'




const GridAsignaturas = ({setForceUpdate,service,asignaturas,setAsignaturas,setAsignaturaToEdit,setIsEditing}) => {
 

  useEffect(() => {
    const updateGrid = async () => {
      try {
        const data = await service.getAll('api/asignaturas');
        setAsignaturas(data)
      } catch (error) {
        console.error('Error al cargar asignaturas:', error);
      }
    };
    updateGrid();
    //eslint-disable-next-line
  }, [setAsignaturas]);

  const deleteAsignatura = async (id) => {
    try {
      await service.delete('api/asignaturas',id);
      //Actualizar lista de asignaturas sin la eliminada
      const updatedAsignaturas = asignaturas.filter((asignatura) => asignatura.id !== id);
      setAsignaturas(updatedAsignaturas);
    } catch (error) {
      console.error('Error al eliminar asignatura:', error);
    }
  }
  

  // Cuando le damos a modificar en el grid
  const handleEdit = (id) => {
    const asignatura = asignaturas.find((asignatura) => asignatura.id === id);
    setAsignaturaToEdit(asignatura);
    setIsEditing(true);
    setForceUpdate(prev => !prev);
  };

  //Mostrar datos en el grid
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'nombre', name: 'Nombre'}
  ];

  const rows = asignaturas.map(asignatura => ({
    id: asignatura.id,
    nombre: asignatura.nombre
  }));



  return (
    <div className='grid-container'>
    <h2 className='title-grid'>Lista de Asignaturas</h2>
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
                <button onClick={() => deleteAsignatura(row.id)} className="eliminar">
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

export default GridAsignaturas;

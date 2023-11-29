import React, {useEffect} from 'react';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'




const GridDepartamentos = ({setForceUpdate,service,departamentos,setDepartamentos,setDepartamentoToEdit,setIsEditing}) => {
 

  useEffect(() => {
    const updateGrid = async () => {
      try {
        const data = await service.getAll('api/departamentos');
        setDepartamentos(data)
      } catch (error) {
        console.error('Error al cargar departamentos:', error);
      }
    };
    updateGrid();
    //eslint-disable-next-line
  }, [setDepartamentos]);

  const deleteDepartamentos = async (id) => {
    try {
      await service.delete('api/departamentos',id);
      //Actualizar lista de departamentos sin la eliminada
      const updatedDepartamentos = departamentos.filter((departamento) => departamento.id !== id);
      setDepartamentos(updatedDepartamentos);
    } catch (error) {
      console.error('Error al eliminar departamento:', error);
    }
  }
  

  // Cuando le damos a modificar en el grid
  const handleEdit = (id) => {
    const departamento = departamentos.find((departamento) => departamento.id === id);
    setDepartamentoToEdit(departamento);
    setIsEditing(true);
    setForceUpdate(prev => !prev);
  };

  //Mostrar datos en el grid
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'nombre', name: 'Nombre'}
  ];

  const rows = departamentos.map(departamento => ({
    id: departamento.id,
    nombre: departamento.nombre
  }));



  return (
    <div className='grid-container'>
    <h2 className='title-grid'>Lista de Departamentos</h2>
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
                <button onClick={() => deleteDepartamentos(row.id)} className="eliminar">
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

export default GridDepartamentos;
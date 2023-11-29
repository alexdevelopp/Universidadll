import React, {useEffect} from 'react';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'

const GridProfesores = ({setForceUpdate,service,profesores,setProfesores,setProfesorToEdit,setIsEditing}) => {



    useEffect(() => {
      const updateGrid = async () => {
        try {
          const data = await service.getAll('api/profesores');
          setProfesores(data)
          console.log(data)
        } catch (error) {
          console.error('Error al cargar profesores:', error);
        }
      };
      updateGrid();
      //eslint-disable-next-line
    }, [setProfesores]);
  
    const deleteProfesor = async (id) => {
      try {
        await service.delete('api/profesores',id);
        //Actualizar lista de provincias sin la eliminada
        const updateProfesores = profesores.filter((profesor) => profesor.id !== id);
        setProfesores(updateProfesores);
      } catch (error) {
        console.error('Error al eliminar el profesor:', error);
      }
    }

  
    
  
    // Cuando le damos a modificar en el grid
    const handleEdit = (id) => {
      const profesor = profesores.find((profesor) => profesor.id === id);
      setProfesorToEdit(profesor);
      setIsEditing(true);
      setForceUpdate(prev => !prev);
    };
  
    //Mostrar datos en el grid
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'nombre', name: 'Nombre'},
      {key:'provincia',name:'Provincia'}
    ];
  
    const rows = profesores.map(profesor => ({
      id: profesor.id,
      nombre: profesor.nombre,
      provincia: profesor.provincia ? profesor.provincia.nombre : ''
    }));
  
  
  
    return (
      <div className='grid-container'>
      <h2 className='title-grid'>Lista de Profesores</h2>
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
                  <button onClick={() => deleteProfesor(row.id)} className="eliminar">
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
  
  export default GridProfesores;
  
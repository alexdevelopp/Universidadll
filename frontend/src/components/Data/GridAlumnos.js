import React, {useEffect} from 'react';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'

const GridAlumnos = ({setForceUpdate,service,alumnos,setAlumnos,setAlumnoToEdit,setIsEditing}) => {



    useEffect(() => {
      const updateGrid = async () => {
        try {
          const data = await service.getAll('api/alumnos');
          setAlumnos(data)
          console.log(data)
        } catch (error) {
          console.error('Error al cargar alumnos:', error);
        }
      };
      updateGrid();
      //eslint-disable-next-line
    }, [setAlumnos]);
  
    const deleteAlumno = async (id) => {
      try {
        await service.delete('api/alumnos',id);
        //Actualizar lista de alumnos sin la eliminada
        const updateAlumnos = alumnos.filter((alumno) => alumno.id !== id);
        setAlumnos(updateAlumnos);
      } catch (error) {
        console.error('Error al eliminar el alumnos:', error);
      }
    }

  
    
  
    // Cuando le damos a modificar en el grid
    const handleEdit = (id) => {
      const alumno = alumnos.find((alumno) => alumno.id === id);
      setAlumnoToEdit(alumno);
      setIsEditing(true);
      setForceUpdate(prev => !prev);
    };
  
    //Mostrar datos en el grid
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'nombre', name: 'Nombre'},
      {key:'curso',name:'Curso'}
    ];
  
    const rows = alumnos.map(alumno => ({
      id: alumno.id,
      nombre: alumno.nombre,
      curso: alumno.curso ? alumno.curso.nombre : ''
    }));
  
  
  
    return (
      <div className='grid-container'>
      <h2 className='title-grid'>Lista de Alumnos</h2>
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
                  <button onClick={() => deleteAlumno(row.id)} className="eliminar">
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
  
  export default GridAlumnos;
  
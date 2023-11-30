import React, {useEffect} from 'react';
import '../../styles.css/grid.css'
import '../../styles.css/button.css'

const GridCursos = ({setForceUpdate,service,cursos,setCursos,setCursoToEdit,setIsEditing}) => {



    useEffect(() => {
      const updateGrid = async () => {
        try {
          const data = await service.getAll('api/cursos');
          setCursos(data)
          console.log(data)
        } catch (error) {
          console.error('Error al cargar cursos:', error);
        }
      };
      updateGrid();
      //eslint-disable-next-line
    }, [setCursos]);
  
    const deleteCurso = async (id) => {
      try {
        await service.delete('api/cursos',id);
        //Actualizar lista de cursos sin la eliminada
        const updateCursos = cursos.filter((curso) => curso.id !== id);
        setCursos(updateCursos);
      } catch (error) {
        console.error('Error al eliminar el profesor:', error);
      }
    }

  
    
  
    // Cuando le damos a modificar en el grid
    const handleEdit = (id) => {
      const curso = cursos.find((curso) => curso.id === id);
      setCursoToEdit(curso);
      setIsEditing(true);
      setForceUpdate(prev => !prev);
    };
  
    //Mostrar datos en el grid
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'nombre', name: 'Nombre'},
      {key:'departamento',name:'Departamento'}
    ];
  
    const rows = cursos.map(curso => ({
      id: curso.id,
      nombre: curso.nombre,
      departamento: curso.departamento ? curso.departamento.nombre : ''
    }));
  
  
  
    return (
      <div className='grid-container'>
      <h2 className='title-grid'>Lista de Cursos</h2>
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
                  <button onClick={() => deleteCurso(row.id)} className="eliminar">
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
  
  export default GridCursos;
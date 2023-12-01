import React, { useState, useEffect } from 'react';
import '../../styles.css/form.css'
import '../../styles.css/button.css'



const FormAlumno = ({forceUpdate,setForceUpdate,service,alumnoToEdit,isEditing,setIsEditing,setAlumnos}) => {
  
  const [name, setName] = useState('');
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState('');

  useEffect(() => {
    if (alumnoToEdit || forceUpdate) {
      setName(alumnoToEdit?.nombre || '');
      // Buscar el curso correspondiente al ID del profesor
    const cursoSeleccionado = cursos.find(
      curso => curso.id === alumnoToEdit?.curso?.id
    );
      setSelectedCurso(cursoSeleccionado);
      setForceUpdate(false); 
    }
    //eslint-disable-next-line
  }, [alumnoToEdit, forceUpdate]);

  //Cargar cursos en el Select
  useEffect(() => {
    const getCursos = async () => {
      try {
        const listaCursos = await service.getAll('api/cursos');
        setCursos(listaCursos);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
    };
    getCursos();
    // eslint-disable-next-line
  }, [setCursos]);

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
  const newAlumno = {
    nombre: name,
    curso_id: selectedCurso.id
  };

    if (isEditing) {
      await service.update('api/alumnos',alumnoToEdit.id,newAlumno);
      const updateAlumnos = await service.getAll('api/alumnos');
      console.log("Modificacion conseguida!")
      setAlumnos(updateAlumnos);
      setIsEditing(false)
    } else {
      await service.create('api/alumnos',newAlumno); 
      console.log("Insertacion conseguida!")
      const updateAlumnos = await service.getAll('api/alumnos');
      setAlumnos(updateAlumnos);
    }
    setName('');
    setSelectedCurso('')
  };

  //Boton cancelar 
  const handleCancel = () => {
    setName(''); 
    setIsEditing(false);
    setSelectedCurso('')
  };

  return (
  <form className='my-form' onSubmit={handleSubmit}>
  <div className='input-container'>
    <label htmlFor="name" className='custom-label'>Nombre:</label>
    <input type="text" id="name" value={name} onChange={handleNameChange} className='custom-input' />
  </div>
  <div className='input-container'>
    <label htmlFor="curso" className='custom-label'>Curso:</label>
<select
  id="provincia"
  value={selectedCurso ? selectedCurso.nombre : ''} 
  onChange={(e) => setSelectedCurso(cursos.find(c => c.nombre === e.target.value))} 
  className='custom-select'
>
  <option value=''>Selecciona una provincia</option>
  {cursos.map((curso) => (
    <option key={curso.id} value={curso.nombre}>
      {curso.nombre}
    </option>
  ))}
</select>
  </div>
  <div className='button-container'>
    <button type="submit" className='submit-form'>
      {isEditing ? 'Actualizar' : 'Enviar'}
    </button>
    <button type='button' onClick={handleCancel} className='cancel-form'>
      Cancelar
    </button>
  </div>
</form>
  );
};

export default FormAlumno;

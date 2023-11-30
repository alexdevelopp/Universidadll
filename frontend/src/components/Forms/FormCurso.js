import React, { useState, useEffect } from 'react';
import '../../styles.css/form.css'
import '../../styles.css/button.css'



const FormCurso = ({forceUpdate,setForceUpdate,service,cursoToEdit,isEditing,setIsEditing,setCursos}) => {
  
  const [name, setName] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');

  useEffect(() => {
    if (cursoToEdit || forceUpdate) {
      setName(cursoToEdit?.nombre || '');
      // Buscar el departamento correspondiente al ID del profesor
    const departamentoSeleccionado = departamentos.find(
      departamento => departamento.id === cursoToEdit?.departamento?.id
    );
      setSelectedDepartamento(departamentoSeleccionado);
      setForceUpdate(false); 
    }
    //eslint-disable-next-line
  }, [cursoToEdit, forceUpdate]);

  //Cargar provincias en el Select
  useEffect(() => {
    const getDepartamentos = async () => {
      try {
        const listaDepartamentos = await service.getAll('api/departamentos');
        setDepartamentos(listaDepartamentos);
      } catch (error) {
        console.error('Error al cargar provincias:', error);
      }
    };
    getDepartamentos();
    // eslint-disable-next-line
  }, [setDepartamentos]);

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log()
  const newCurso = {
    nombre: name,
    departamento: {
      id: selectedDepartamento.id, 
      nombre: selectedDepartamento.nombre
    }
  };

    if (isEditing) {
      await service.update('api/departamentos',cursoToEdit.id,newCurso);
      const updateCursos = await service.getAll('api/cursos');
      console.log("Modificacion conseguida!")
      setCursos(updateCursos);
      setIsEditing(false)
    } else {
      await service.create('api/cursos',newCurso); 
      console.log("Insertacion conseguida!")
      const updateCursos = await service.getAll('api/cursos');
      setCursos(updateCursos);
    }
    setName('');
    setSelectedDepartamento('')
  };

  //Boton cancelar 
  const handleCancel = () => {
    setName(''); 
    setIsEditing(false);
    setSelectedDepartamento('')
  };

  return (
  <form className='my-form' onSubmit={handleSubmit}>
  <div className='input-container'>
    <label htmlFor="name" className='custom-label'>Nombre:</label>
    <input type="text" id="name" value={name} onChange={handleNameChange} className='custom-input' />
  </div>
  <div className='input-container'>
    <label htmlFor="provincia" className='custom-label'>Departamento:</label>
<select
  id="provincia"
  value={selectedDepartamento ? selectedDepartamento.nombre : ''} 
  onChange={(e) => setSelectedDepartamento(departamentos.find(d => d.nombre === e.target.value))} 
  className='custom-select'
>
  <option value=''>Selecciona un departamento</option>
  {departamentos.map((departamento) => (
    <option key={departamento.id} value={departamento.nombre}>
      {departamento.nombre}
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

export default FormCurso;
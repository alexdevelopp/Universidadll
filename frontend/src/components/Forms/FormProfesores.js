import React, { useState, useEffect } from 'react';
import '../../styles.css/form.css'
import '../../styles.css/button.css'



const FormProfesores = ({forceUpdate,setForceUpdate,service,profesorToEdit,isEditing,setIsEditing,setProfesores}) => {
  
  const [name, setName] = useState('');
  const [provincias, setProvincias] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState('');

  useEffect(() => {
    if (profesorToEdit || forceUpdate) {
      setName(profesorToEdit?.nombre || '');
      setSelectedProvincia(profesorToEdit?.provincia?.nombre || '');
      setForceUpdate(false); 
    }
    //eslint-disable-next-line
  }, [profesorToEdit, forceUpdate]);

  //Cargar provincias en el Select
  useEffect(() => {
    const getProvincias = async () => {
      try {
        const listaProvincias = await service.getAll('api/provincias');
        setProvincias(listaProvincias);
      } catch (error) {
        console.error('Error al cargar provincias:', error);
      }
    };
    getProvincias();
    // eslint-disable-next-line
  }, [setProvincias]);

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProfesor = {
      nombre: name,
      provincia: {
        id: selectedProvincia
      }
    };
    if (isEditing) {
      await service.update('api/provincias',profesorToEdit.id,newProfesor);
      const updateProfesores = await service.getAll('api/profesores');
      console.log("Modificacion conseguida!")
      setProfesores(updateProfesores);
      setIsEditing(false)
    } else {
      await service.create('api/profesores',newProfesor); 
      console.log("Insertacion conseguida!")
      const updateProfesores = await service.getAll('api/profesores');
      setProfesores(updateProfesores);
    }
    setName('');
  };

  //Boton cancelar 
  const handleCancel = () => {
    setName(''); 
    setIsEditing(false);
  };

  return (
  <form className='my-form' onSubmit={handleSubmit}>
  <div className='input-container'>
    <label htmlFor="name" className='custom-label'>Nombre:</label>
    <input type="text" id="name" value={name} onChange={handleNameChange} className='custom-input' />
  </div>
  <div className='input-container'>
    <label htmlFor="provincia" className='custom-label'>Provincia:</label>
    <select id="provincia" value={selectedProvincia} onChange={e => setSelectedProvincia(e.target.value)}  className='custom-select'>
  <option value=''>Selecciona una provincia</option>
  {provincias.map((provincia) => (
    <option key={provincia.id} value={provincia.nombre}>
      {provincia.nombre}
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

export default FormProfesores;

import React, { useState, useEffect } from 'react';
import '../../styles.css/form.css'
import '../../styles.css/button.css'



const FormAsignatura = ({forceUpdate,setForceUpdate,service,asignaturaToEdit,isEditing,setIsEditing,setAsignaturas}) => {
  
  const [name, setName] = useState('');

  useEffect(() => {
    if (asignaturaToEdit || forceUpdate) {
      setName(asignaturaToEdit.nombre);
      setForceUpdate(false); 
    }
    //eslint-disable-next-line
  }, [asignaturaToEdit,forceUpdate]);

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAsignatura = {nombre: name}
    if (isEditing) {
      await service.update('api/asignaturas',asignaturaToEdit.id,newAsignatura);
      const updatedAsignaturas = await service.getAll('api/asignaturas');
      console.log("Modificacion conseguida!")
      setAsignaturas(updatedAsignaturas);
      setIsEditing(false)
    } else {
      await service.create('api/asignaturas',newAsignatura); 
      console.log("Insertacion conseguida!")
      const updatedAsignaturas = await service.getAll('api/asignaturas');
      setAsignaturas(updatedAsignaturas);
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
      <div>
        <label className="custom-label" htmlFor="name">Nombre:</label>
        <input       type="text"      id="name"    value={name} onChange={handleNameChange}/>
      </div>
      <div className='button-container'>
      <button className='submit-form' type="submit">
        {isEditing ? 'Actualizar' : 'Enviar'}
      </button>
      <button className='cancel-form' type='button' onClick={handleCancel}>
        Cancelar
      </button>
      </div>
    </form>
  );
};

export default FormAsignatura;
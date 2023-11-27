import React, { useState, useEffect } from 'react';
import '../../styles.css/form.css'
import '../../styles.css/button.css'



const FormProvincia = ({service,provinciaToEdit,isEditing,setIsEditing,setProvincias}) => {
  
  const [name, setName] = useState('');

  useEffect(() => {
    if (provinciaToEdit) {
      setName(provinciaToEdit.nombre);
    }
  }, [provinciaToEdit]);

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProvincia = {nombre: name}
    if (isEditing) {
      await service.update('api/provincias',provinciaToEdit.id,newProvincia);
      const updatedProvincias = await service.getAll('api/provincias');
      console.log("Modificacion conseguida!")
      setProvincias(updatedProvincias);
      setIsEditing(false)
    } else {
      await service.create('api/provincias',newProvincia); 
      console.log("Insertacion conseguida!")
      const updatedProvincias = await service.getAll('api/provincias');
      setProvincias(updatedProvincias);
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
        <label htmlFor="name">Nombre:</label>
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

export default FormProvincia;

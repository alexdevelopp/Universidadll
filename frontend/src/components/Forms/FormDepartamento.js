import React, { useState, useEffect } from 'react';
import '../../styles.css/form.css'
import '../../styles.css/button.css'



const FormDepartamento = ({setForceUpdate,forceUpdate,service,departamentoToEdit,isEditing,setIsEditing,setDepartamentos}) => {
  
  const [name, setName] = useState('');

  useEffect(() => {
    if (departamentoToEdit || forceUpdate) {
      setName(departamentoToEdit.nombre);
      setForceUpdate()
    }
    //eslint-disable-next-line
  }, [departamentoToEdit,forceUpdate]);

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDepartamento = {nombre: name}
    if (isEditing) {
      await service.update('api/departamentos',departamentoToEdit.id,newDepartamento);
      const updatedDepartamentos = await service.getAll('api/departamentos');
      console.log("Modificacion conseguida!")
      setDepartamentos(updatedDepartamentos);
      setIsEditing(false)
    } else {
      await service.create('api/departamentos',newDepartamento); 
      console.log("Insertacion conseguida!")
      const updatedDepartamentos = await service.getAll('api/departamentos');
      setDepartamentos(updatedDepartamentos);
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
        <label className='custom-label' htmlFor="name">Nombre:</label>
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

export default FormDepartamento;
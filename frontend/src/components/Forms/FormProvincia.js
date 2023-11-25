import React, { useState } from 'react';
import axios from 'axios';
import '../../styles.css/form.css'
import '../../styles.css/button.css'


const FormProvincia = ({getAllProvincias}) => {
  const [name, setName] = useState('');

  //Detecta los cambios en el formulario
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Cuando se lanza el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizar la solicitud POST con Axios
      const response = await axios.post('http://localhost:8080/api/provincias', {
        nombre: name
      });
      setName('')
      getAllProvincias()
      console.log('Solicitud POST exitosa:', response.data);
    } catch (error) {
      console.error('Error al hacer la solicitud POST:', error);
    }
  };

  return (
    <form className='my-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input       type="text"      id="name"    value={name} onChange={handleNameChange}/>
      </div>
      <button className='submit-form' type="submit">Enviar</button>
    </form>
  );
};

export default FormProvincia;

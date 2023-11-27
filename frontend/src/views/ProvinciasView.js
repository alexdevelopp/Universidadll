import ApiService from '../components/Api/ApiService';
import Constants from '../components/Api/Constants';
import GridProvincias from '../components/Data/GridProvincias';
import FormProvincia from '../components/Forms/FormProvincia';
import '../styles.css/views.css/provinciaView.css';
import { useState} from 'react';




function ProvinciasView() {

    //Api service
    const baseUrl = Constants.API_BASE_URL;
    const service = new ApiService(baseUrl)

    // Estado para almacenar la lista de provincias
    const [provincias, setProvincias] = useState([]);

    // Estado para la provincia a editar
    const [provinciaToEdit, setProvinciaToEdit] = useState(null);

    // Estado para indicar si estamos editando o guardando uno nuevo
    const [isEditing, setIsEditing] = useState(false);




  return (
    <div className="container">
    <GridProvincias service={service} provincias={provincias} setProvincias={setProvincias} setProvinciaToEdit={setProvinciaToEdit} provinciaToEdit={provinciaToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    <FormProvincia  service={service} setProvincias={setProvincias} provinciaToEdit={provinciaToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    </div>
  );
}

export default ProvinciasView;
import ApiService from '../components/Api/ApiService';
import Constants from '../components/Api/Constants';
import GridDepartamentos from '../components/Data/GridDepartamentos';
import FormDepartamentos from '../components/Forms/FormDepartamento';
import '../styles.css/views.css/view.css';
import { useState} from 'react';
import Header from "../components/Header/Header";
import RouteView from '../components/Menu/RouteView';




function DepartamentosView() {

    //Api service
const baseUrl = Constants.API_BASE_URL;
const service = new ApiService(baseUrl)

// Estado para almacenar la lista de profesores
const [departamentos, setDepartamentos] = useState([]);

// Estado para el profesor a editar
const [departamentoToEdit, setDepartamentoToEdit] = useState(null);

// Estado para indicar si estamos editando o guardando uno nuevo
const [isEditing, setIsEditing] = useState(false);

const [forceUpdate, setForceUpdate] = useState(false);




return (
<div className="container">
<Header/>
<div className='menu-grid'>
    <RouteView/>
<GridDepartamentos forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} departamentos={departamentos} setDepartamentos={setDepartamentos} setDepartamentoToEdit={setDepartamentoToEdit} departamentoToEdit={departamentoToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
      </div>

<FormDepartamentos forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} departamentos={departamentos} setDepartamentos={setDepartamentos} setDepartamentoToEdit={setDepartamentoToEdit} departamentoToEdit={departamentoToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
</div>
);

}

export default DepartamentosView;
import ApiService from '../components/Api/ApiService';
import Constants from '../components/Api/Constants';
import GridProfesores from '../components/Data/GridProfesores';
import FormProfesores from '../components/Forms/FormProfesores';
import '../styles.css/views.css/view.css';
import { useState} from 'react';
import Header from "../components/Header/Header";
import RouteView from '../components/Menu/RouteView';




function ProfesoresView() {

    //Api service
    const baseUrl = Constants.API_BASE_URL;
    const service = new ApiService(baseUrl)

    // Estado para almacenar la lista de profesores
    const [profesores, setProfesores] = useState([]);

    // Estado para el profesor a editar
    const [profesorToEdit, setProfesorToEdit] = useState(null);

    // Estado para indicar si estamos editando o guardando uno nuevo
    const [isEditing, setIsEditing] = useState(false);

    const [forceUpdate, setForceUpdate] = useState(false);




  return (
    <div className="container">
      <Header/>
      <div className='menu-grid'>
     <RouteView/>
    <GridProfesores forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} profesores={profesores} setProfesores={setProfesores} setProfesorToEdit={setProfesorToEdit} profesorToEdit={profesorToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
      </div>
     
    <FormProfesores forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} profesores={profesores} setProfesores={setProfesores} setProfesorToEdit={setProfesorToEdit} profesorToEdit={profesorToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    </div>
  );
}

export default ProfesoresView;
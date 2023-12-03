import ApiService from '../components/Api/ApiService';
import Constants from '../components/Api/Constants';
import GridAlumnos from '../components/Data/GridAlumnos';
import FormAlumno from '../components/Forms/FormAlumno';
import '../styles.css/views.css/view.css';
import { useState} from 'react';
import Header from "../components/Header/Header";
import RouteView from '../components/Menu/RouteView';




function AlumnosView() {

    //Api service
    const baseUrl = Constants.API_BASE_URL;
    const service = new ApiService(baseUrl)

    // Estado para almacenar la lista de profesores
    const [alumnos, setAlumnos] = useState([]);

    // Estado para el profesor a editar
    const [alumnoToEdit, setAlumnoToEdit] = useState(null);

    // Estado para indicar si estamos editando o guardando uno nuevo
    const [isEditing, setIsEditing] = useState(false);

    const [forceUpdate, setForceUpdate] = useState(false);




  return (
    <div className="container">
      <Header/>
      <div className='menu-grid'>
<RouteView/>
    <GridAlumnos forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} alumnos={alumnos} setAlumnos={setAlumnos} setAlumnoToEdit={setAlumnoToEdit} alumnoToEdit={alumnoToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>

      </div>
      
    <FormAlumno forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} alumnos={alumnos} setAlumnos={setAlumnos} setAlumnoToEdit={setAlumnoToEdit} alumnoToEdit={alumnoToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    </div>
  );
}

export default AlumnosView;
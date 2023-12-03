import ApiService from '../components/Api/ApiService';
import Constants from '../components/Api/Constants';
import GridCursos from '../components/Data/GridCursos';
import FormCurso from '../components/Forms/FormCurso';
import '../styles.css/views.css/view.css';
import { useState} from 'react';
import Header from "../components/Header/Header";
import RouteView from '../components/Menu/RouteView';




function CursosView() {

    //Api service
    const baseUrl = Constants.API_BASE_URL;
    const service = new ApiService(baseUrl)

    // Estado para almacenar la lista de profesores
    const [cursos, setCursos] = useState([]);

    // Estado para el profesor a editar
    const [cursoToEdit, setCursoToEdit] = useState(null);

    // Estado para indicar si estamos editando o guardando uno nuevo
    const [isEditing, setIsEditing] = useState(false);

    const [forceUpdate, setForceUpdate] = useState(false);




  return (
    <div className="container">
      <Header/>
      <div className='menu-grid'>
        <RouteView/>
    <GridCursos forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} cursos={cursos} setCursos={setCursos} setCursoToEdit={setCursoToEdit} cursoToEdit={cursoToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
      </div>
      
    <FormCurso forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} service={service} cursos={cursos} setCursos={setCursos} setCursoToEdit={setCursoToEdit} cursoToEdit={cursoToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    </div>
  );
}

export default CursosView;
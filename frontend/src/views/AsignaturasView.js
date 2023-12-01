import ApiService from '../components/Api/ApiService';
import Constants from '../components/Api/Constants';
import GridAsignaturas from '../components/Data/GridAsignaturas';
import FormAsignatura from '../components/Forms/FormAsignatura';
import '../styles.css/views.css/view.css';
import { useState} from 'react';




function AsignaturasView() {

    //Api service
    const baseUrl = Constants.API_BASE_URL;
    const service = new ApiService(baseUrl)

    // Estado para almacenar la lista de provincias
    const [asignaturas, setAsignaturas] = useState([]);

    // Estado para la provincia a editar
    const [asignaturaToEdit, setAsignaturaToEdit] = useState(null);

    // Estado para indicar si estamos editando o guardando uno nuevo
    const [isEditing, setIsEditing] = useState(false);

    const [forceUpdate, setForceUpdate] = useState(false);




  return (
    <div className="container">
    <GridAsignaturas setForceUpdate={setForceUpdate} service={service} asignaturas={asignaturas} setAsignaturas={setAsignaturas} setAsignaturaToEdit={setAsignaturaToEdit} asignaturaToEdit={asignaturaToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    <FormAsignatura  setForceUpdate={setForceUpdate} forceUpdate={forceUpdate} service={service} setAsignaturas={setAsignaturas} asignaturaToEdit={asignaturaToEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
    </div>
  );
}

export default AsignaturasView;
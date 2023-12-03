import '../../styles.css/links.css'
import { Link } from 'react-router-dom';

const RouteView = ({ruta,texto}) => {
    return (
        <div className='links-container'>
            <div className="rectangulo"><Link to={"/provincias"}>{"Provincias"}</Link></div>
            <div className="rectangulo"><Link to={"/profesores"}>{"Profesores"}</Link></div>
            <div className="rectangulo"><Link to={"/departamentos"}>{"Departamentos"}</Link></div>
            <div className="rectangulo"><Link to={"/alumnos"}>{"Alumnos"}</Link></div>
            <div className="rectangulo"><Link to={"/asignaturas"}>{"Asignaturas"}</Link></div>
            <div className="rectangulo"><Link to={"/cursos"}>{"Cursos"}</Link></div>
        </div>
            
    );
}


export default RouteView;
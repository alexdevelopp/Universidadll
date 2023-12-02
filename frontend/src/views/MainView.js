import RouteView from "../components/Menu/RouteView";
import '../styles.css/views.css/view.css'

const MainView = () => {
    return (
      <div className="contenedor">
        <div className="links-container">
        <RouteView ruta="/provincias" texto="Provincias" />
        <RouteView ruta="/profesores" texto="Profesores" />
        <RouteView ruta="/departamentos" texto="Departamentos" />
        <RouteView ruta="/cursos" texto="Cursos" />
        <RouteView ruta="/asignaturas" texto="Asignaturas" />
        <RouteView ruta="/alumnos" texto="Alumnos" />
        </div>
       
      </div>
    );
  };
  
  export default MainView;
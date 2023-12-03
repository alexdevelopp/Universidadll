import RouteView from "../components/Menu/RouteView";
import '../styles.css/views.css/view.css'
import Header from "../components/Header/Header";

const MainView = () => {
    return (
      <div className="contenedor">
        <Header/>
        <RouteView/>
       
      </div>
    );
  };
  
  export default MainView;
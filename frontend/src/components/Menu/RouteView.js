import '../../styles.css/links.css'
import { Link } from 'react-router-dom';

const RouteView = ({ruta,texto}) => {
    return (
            <div className="rectangulo"><Link to={ruta}>{texto}</Link></div>
    );
}

export default RouteView;
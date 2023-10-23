import logo from './logo.svg';
//import './App.css';
//import { Login } from './components/general Component (1)';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Login from './components/general Component (1)/src/screens/Login';
import { Login } from './components/users/login';
//import { AltaDeUsuario } from './components/alta';
import { AltaDeUsuario } from './components/users/alta/'
//import { ModificarUsuario } from './components/modificacion/modificacion';
import ModificarUsuario from './components/users/modificacion/modificacion/src/screens/ModificarUsuario'
import HomeScreen from './components/news/inicio/src/screens/HomeScreen';
import { AuthProvider } from './AuthContext';
import ListarOfrecimientosPropios from './components/users/list_ofrecimientos_users/src/screens/ListarOfrecimientosPropios';
import ListarSolicitudesPropios from './components/users/list_solicitudes_users/src/screens/ListarSolicitudesPropios';
import AltaEquipamiento from './components/medicalequipment/alta_equipamiento/screens/AltaEquipamiento';
import Listeqscreen from './components/medicalequipment/list_equipamiento_medico/src/screens/Listeqscreen';
import SolicitarEquipamiento from './components/medicalequipment/request_eq_medico/src/screens/SolicitarEquipamiento';
import EditarEquipamiento from './components/medicalequipment/editar_equipamiento/src/screens/EditarEquipamiento';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/alta" component={AltaDeUsuario} />
          <Route path="/modificacion" component={ModificarUsuario} />
          <Route path="/inicio" component={HomeScreen} />
          <Route path="/listadoofrecimientos" component={ListarOfrecimientosPropios} />
          <Route path="/listadosolicitudes" component={ListarSolicitudesPropios} />
          <Route path="/altaequipamiento" component={AltaEquipamiento} />
          <Route path="/listadoequipamiento" component={Listeqscreen} />
          <Route path="/solicitarequipamiento/:equipamientoId" component={SolicitarEquipamiento} />
          <Route path="/editarequipamiento/:eq_id" component={EditarEquipamiento} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

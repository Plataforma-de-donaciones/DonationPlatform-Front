import logo from './logo.svg';
//import './App.css';
//import { Login } from './components/general Component (1)';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/general Component (1)/src/screens/Login';
import { AltaDeUsuario } from './components/alta';
import { ModificarUsuario } from './components/modificacion/modificacion';
import HomeScreen from './components/inicio/src/screens/HomeScreen';
import { AuthProvider } from './AuthContext';
import ListarOfrecimientosPropios from './components/list_ofrecimientos_users/src/screens/ListarOfrecimientosPropios';
import ListarSolicitudesPropios from './components/list_solicitudes_users/src/screens/ListarSolicitudesPropios';
import AltaEquipamiento from './components/alta_equipamiento/screens/AltaEquipamiento';
import Listeqscreen from './components/list_equipamiento_medico/src/screens/Listeqscreen';

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
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

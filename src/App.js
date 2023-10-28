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
import AltaDonacion from './components/donation/alta_donacion/screens/AltaDonacion';
import Listdonscreen from './components/donation/listar_donacion/src/screens/Listdonscreen';
import EditarDonacion from './components/donation/editar_donacion/src/screens/EditarEquipamiento';
import AltaVoluntariado from './components/volunteer/alta_voluntario/screens/AltaVoluntariado';
import ListVolscreen from './components/volunteer/listar_voluntario/src/screens/ListVolScreen';
import DonarEquipamiento from './components/medicalequipment/request_eq_medico_ofr/src/screens/DonarEquipamiento';


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
          <Route path="/donarequipamiento/:equipamientoId" component={DonarEquipamiento} />
          <Route path="/editarequipamiento/:eq_id" component={EditarEquipamiento} />
          <Route path="/altadonacion/" component={AltaDonacion} />
          <Route path="/listadodonacion/" component={Listdonscreen} />
          <Route path="/editardonacion/:don_id" component={EditarDonacion} />
          <Route path="/altavoluntariado/" component={AltaVoluntariado} />
          <Route path="/listadovoluntariado/" component={ListVolscreen} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

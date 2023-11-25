import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/users/login';
import { AltaDeUsuario } from './components/users/alta/'
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
import DonarDonacion from './components/donation/request_donacion_ofr/src/screens/DonarDonacion';
import SolicitarDonacion from './components/donation/request_donacion/src/screens/SolicitarDonacion';
import ListarReqOfrecimiento from './components/users/list_requests_eq/src/screens/ListarReqOfrecimiento';
import ChatScreen from './components/users/chat/screens/ChatScreen';
import ConversationScreen from './components/users/chatlist/screens/ConversationScreen';
import ListarReqOfrecimientoDon from './components/users/list_requests_don/src/screens/ListarReqOfrecimientoDon';
import SolicitarVoluntario from './components/volunteer/request_voluntario/src/screens/SolicitarVoluntario';
import DonarVoluntariado from './components/volunteer/request_voluntario_ofr/src/screens/DonarVoluntariado';
import EditarVoluntario from './components/volunteer/editar_voluntario/src/screens/EditarVoluntario';
import AltaSponsor from './components/sponsor/alta_sponsor/screens/AltaSponsor';
import ListSponsorscreen from './components/sponsor/listar_voluntario/src/screens/ListVolScreen';
import SolicitarPadrino from './components/sponsor/request_sponsor/src/screens/SolicitarPadrino';
import DonarPadrino from './components/sponsor/request_sponsor_ofr/src/screens/DonarPadrino';
import EditarSponsor from './components/sponsor/editar_sponsor/src/screens/EditarSponsor';
import ListarReqOfrecimientoVol from './components/users/list_requests_vol/src/screens/ListarReqOfrecimientoVol';
import ListarReqOfrecimientoSponsor from './components/users/list_requests_sponsor/src/screens/ListarReqOfrecimientoSponsor';
import TerminosCondiciones from './components/generales/src/components/TerminosCondiciones';
import Contacto from './components/generales/src/components/Contacto';
import AcercaDe from './components/generales/src/components/AcercaDe';
import PreguntasFrecuentes from './components/generales/src/components/PreguntasFrecuentes';
import AltaEvento from './components/events/alta_evento/screens/AltaEvento';
import ListEveScreen from './components/events/listar_evento/src/screens/ListEveScreen';
import EditarEvento from './components/events/editar_evento/src/screens/EditarEvento';
import ListUsers from './components/administrator/list_users/screens/ListUsers';
import ListModerators from './components/administrator/list_moderators/screens/ListModerators';
import ListNews from './components/administrator/list_news/screens/ListNews';
import AltaNew from './components/administrator/alta_news/screens/AltaNew';
import EditarNoticia from './components/administrator/editar_news/src/screens/EditarNoticia';
import EditarUser from './components/administrator/editar_user/src/screens/EditarUser';
import AltaModerador from './components/administrator/alta_moderador/screens/AltaModerador';
import ListAdministrators from './components/administrator/list_administrators/screens/ListAdministrators';
import AltaAdministrador from './components/administrator/alta_administrador/screens/AltaAdministrator';
import ListUsersMod from './components/moderator/list_users/screens/ListUsersMod';
import ListNewsMod from './components/moderator/list_news/screens/ListNewsMod';
import AltaNewMod from './components/moderator/alta_news/screens/AltaNewMod';
import EditarNoticiaMod from './components/moderator/editar_news/src/screens/EditarNoticiaMod';

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
          <Route path="/solicitardonacion/:donacionId" component={SolicitarDonacion} />
          <Route path="/solicitarvoluntariado/:voluntarioId" component={SolicitarVoluntario} />
          <Route path="/solicitarpadrino/:sponsorId" component={SolicitarPadrino} />
          <Route path="/donarequipamiento/:equipamientoId" component={DonarEquipamiento} />
          <Route path="/donardonacion/:donacionId" component={DonarDonacion} />
          <Route path="/donarvoluntariado/:voluntarioId" component={DonarVoluntariado} />
          <Route path="/donarpadrino/:sponsorId" component={DonarPadrino} />
          <Route path="/editarequipamiento" component={EditarEquipamiento} />
          <Route path="/altadonacion/" component={AltaDonacion} />
          <Route path="/altasponsor/" component={AltaSponsor} />
          <Route path="/altaevento/" component={AltaEvento} />
          <Route path="/listadodonacion/" component={Listdonscreen} />
          <Route path="/editardonacion" component={EditarDonacion} />
          <Route path="/editarvoluntario" component={EditarVoluntario} />
          <Route path="/editarsponsor" component={EditarSponsor} />
          <Route path="/editarevento" component={EditarEvento} />
          <Route path="/editarnoticia/:new_id" component={EditarNoticia} />
          <Route path="/editarnoticiamod/:new_id" component={EditarNoticiaMod} />
          <Route path="/editarusuario/:user_id" component={EditarUser} />
          <Route path="/altavoluntariado/" component={AltaVoluntariado} />
          <Route path="/listadovoluntariado/" component={ListVolscreen} />
          <Route path="/listadoeventos/" component={ListEveScreen} />
          <Route path="/listadorequesteq/:eqId" component={ListarReqOfrecimiento} />
          <Route path="/conversaciones/:convId" component={ChatScreen} />
          <Route path="/listaconversaciones/" component={ConversationScreen} />
          <Route path="/listadorequestdon/:donId" component={ListarReqOfrecimientoDon} />
          <Route path="/listadorequestvol/:voluntarioId" component={ListarReqOfrecimientoVol} />
          <Route path="/listadorequestsponsor/:sponsorId" component={ListarReqOfrecimientoSponsor} />
          <Route path="/listadoapadrinamiento/" component={ListSponsorscreen} />
          <Route path="/terminoscondiciones/" component={TerminosCondiciones} />
          <Route path="/contacto" component={Contacto}/>
          <Route path="/acercadenosotros" component={AcercaDe}/>
          <Route path="/preguntasfrecuentes" component={PreguntasFrecuentes}/>
          <Route path="/paneladministrador/" component={ListUsers} />
          <Route path="/listadousuarios/" component={ListUsers} />
          <Route path="/listadomoderadores/" component={ListModerators} />
          <Route path="/listadonoticias/" component={ListNews} />
          <Route path="/altanoticia/" component={AltaNew} /> 
          <Route path="/altamoderador/" component={AltaModerador} />
          <Route path="/listadoadministradores/" component={ListAdministrators} />
          <Route path="/altaadministrador/" component={AltaAdministrador} />
          <Route path="/panelmoderador/" component={ListUsersMod} />
          <Route path="/listadonoticiasmod/" component={ListNewsMod} />
          <Route path="/listadousuariosmod/" component={ListUsersMod} />
          <Route path="/altanoticiamod/" component={AltaNewMod} /> 
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

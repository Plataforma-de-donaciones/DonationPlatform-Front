import logo from './logo.svg';
//import './App.css';
//import { Login } from './components/general Component (1)';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/general Component (1)/src/screens/Login';
import { AltaDeUsuario } from './components/alta';
import { ModificarUsuario } from './components/modificacion/modificacion';
import HomeScreen from './components/inicio/src/screens/HomeScreen';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/alta" component={AltaDeUsuario} />
          <Route path="/modificacion" component={ModificarUsuario} />
          <Route path="/inicio" component={HomeScreen} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

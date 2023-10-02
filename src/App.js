import logo from './logo.svg';
//import './App.css';
//import { Login } from './components/general Component (1)';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/general Component (1)/src/screens/Login';
import { AltaDeUsuario } from './components/alta';
import { ModificarUsuario } from './components/modificacion/modificacion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/alta" element={<AltaDeUsuario />} />
        <Route path="/modificacion" element={<ModificarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
//import './App.css';
//import { Login } from './components/general Component (1)';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/general Component (1)/src/screens/Login';
import { AltaDeUsuario } from './components/alta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/alta" element={<AltaDeUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;

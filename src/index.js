import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TestPage from './testLogin'; // Importa la página de prueba
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas agregar un botón o enlace para acceder a la página de prueba, puedes hacerlo aquí
/*const rootTest = ReactDOM.createRoot(document.getElementById('root-test'));
rootTest.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

// Si deseas medir el rendimiento en tu aplicación, puedes hacerlo aquí
reportWebVitals();


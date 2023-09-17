import React from 'react';
import {Login} from './componentes/login1/Login1Component'; // Asegúrate de que la ruta sea correcta

function TestPage() {
  return (
    <div>
      <h1>Página de Prueba</h1>
      <Login /> {/* Renderiza tu componente aquí */}
    </div>
  );
}

export default TestPage;


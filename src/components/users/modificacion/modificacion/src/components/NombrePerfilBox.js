import React from "react";
import styled from "styled-components";

const styles = {
  creaUnaContrasena: {
    fontSize: "12px",
    textAlign: "left",
    color: "rgba(0,0,0,1)",
    opacity: 0.6,
    paddingTop: "16px",
    display: "block",
  },
};

function NombrePerfilBox({ user_name }) {
  return (
    <>
      <label style={styles.creaUnaContrasena}>Nombre de usuario</label>
      <input disabled className="form-control" value ={user_name}/>
    
    </>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #d9d5dc;
  background-color: transparent;
  flex-direction: column;
  width: 100%; /* Hace que el contenedor ocupe el 100% del ancho disponible */
  max-width: 600px; /* Establece un ancho máximo para mantener la legibilidad */
  margin: 0 auto; /* Centra el contenedor en la página */
`;

const PerfilNombreText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-weight: 700;
`;

const PerfilNombreBbdd = styled.span`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d9d5dc;
`;

export default NombrePerfilBox;

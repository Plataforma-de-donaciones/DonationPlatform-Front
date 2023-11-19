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
function CorreoPerfilBox({ user_email }) {
  return (
    <>
      <label style={styles.creaUnaContrasena}>Correo electrónico</label>
      <input disabled className="form-control" value={user_email} />
    </>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #d9d5dc;
  background-color: transparent;
  flex-direction: column;
  margin-bottom: 16px; /* Añade un margen inferior */
`;

const PerfilCorreoText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  width: 150px;
  height: 30px;
  font-weight: 700;
`;

const PerfilCorreoBbdd = styled.span`
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

  @media screen and (max-width: 768px) {
    /* Ajustar estilos para pantallas más pequeñas */
    font-size: 12px;
  }
`;

export default CorreoPerfilBox;

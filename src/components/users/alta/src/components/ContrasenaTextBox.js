import React, { useState } from "react";
import styled from "styled-components";
import { FaEyeSlash, FaEye } from "react-icons/fa";

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

function ContrasenaTextBox(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <label style={styles.creaUnaContrasena}>Crea una contraseña*</label>
      <PasswordInput
        className="form-control"
        type={showPassword ? "text" : "password"}
        placeholder="Crea una contraseña."
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
      <PasswordVisibilityIcon
        onClick={togglePasswordVisibility}
        showPassword={showPassword}
      />
      <HelperText>
        Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter
        especial.
      </HelperText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 100%;
`;

const PasswordInput = styled.input`
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  align-self: stretch;
  line-height: 16px;
  padding-top: 14px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #d9d5dc;
  width: 100%;
  position: relative;
`;

const PasswordVisibilityIcon = styled.div`
  color: rgba(128, 128, 128, 1);
  font-size: 20px;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  ${(props) => (props.showPassword ? "display: none;" : "display: block;")}
`;

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

export default ContrasenaTextBox;

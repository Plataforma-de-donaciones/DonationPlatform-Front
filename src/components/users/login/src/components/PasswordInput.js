import React, { useState } from "react";
import styled from "styled-components";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Form, InputGroup } from "react-bootstrap";

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Form.Control
        type={showPassword ? "text" : "password"}
        placeholder={props.passwordPlaceholder || "Contraseña"}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
          <InputGroup.Text id="inputGroupPrepend">
          {showPassword ? (
        <FaEyeSlash
          onClick={togglePasswordVisibility}
          style={{
            color: "rgba(128, 128, 128, 1)",
            fontSize: "20px",
           
          }}
        />
      ) : (
        <FaEye
          onClick={togglePasswordVisibility}
          style={{
            color: "rgba(128, 128, 128, 1)",
            fontSize: "20px",
           
          }}
        />
      )}
                    </InputGroup.Text>
    
    </>
  );
}

const Container = styled.div`
  // display: flex;
  // border-bottom: 1px solid rgba(230, 230, 230, 1);
  // background-color: transparent;
  // flex-direction: row;
  // align-items: center;
  // position: relative;
`;

const PasswordPlaceholder = styled.input`
  // color: #000;
  // padding-right: 16px;
  // font-size: 14px;
  // align-self: center;
  // flex: 1;
  // line-height: 16px;
  // padding-top: 14px;
  // padding-bottom: 8px;
  // border: none;
  // background: transparent;
  // display: flex;
  // flex-direction: column;
  // width: 100%;
`;

export default PasswordInput;

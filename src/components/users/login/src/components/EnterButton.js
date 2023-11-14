import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-top: 8px;
  border-radius: 100px;
  border: 1px solid #ddd;

  min-width: 88px;

  background-color: rgba(141, 202, 170, 1);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition-duration: 0.4s;

  &:hover {
    background-color: rgba(79,181,139, 1);
  }

  @media (max-width: 768px) {
    min-width: 60px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const EnterText = styled.span`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 550;

  @media (max-width: 350px) {
    font-size: 12px;
  }
`;

function EnterButton(props) {
  return (
    <Button type="button" {...props}>
      <EnterText>Ingresar</EnterText>
    </Button>
  );
}

export default EnterButton;

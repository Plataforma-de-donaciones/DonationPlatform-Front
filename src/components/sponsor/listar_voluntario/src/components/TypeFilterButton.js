// TypeFilterButton.js
import React from "react";
import styled from "styled-components";

const TypeFilterButton = styled.button`
background-color: transparent;
justify-content: center;
align-items: center;
flex-direction: row;
border-radius: 5px;
border: none;
cursor: pointer;
color: #454A2C; 
  font-weight: bold;
  &:hover {
    background-color: #454A2C; 
    color: #fff;
  }

  &:not(:last-child) {
    margin-right: -100px; 
    margin-bottom: 10px; 
  }
`;

export default TypeFilterButton;

import React, { Component } from "react";
import styled, { css } from "styled-components";

function DescripcionNewBox(props) {
  return (
    <Container {...props}>
      <Label>Descripción de la noticia: *</Label>
      <TextareaStyle
        placeholder="Describa la noticia"
        maxLength={250}
      ></TextareaStyle>
      <HelperText>Este dato se visualiza en la publicación.</HelperText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: rgba(0,0,0,1);
  opacity: 0.6;
  padding-top: 16px;
  left: 0px;
  width: 375px;
  top: 0px;
  height: 31px;
  font-style: normal;
  font-weight: 700;
`;

const TextareaStyle = styled.textarea`
  border: 1px solid #D9D5DC;
  color: #000;
  font-size: 14px;
  line-height: 16px;
  padding: 8px;
  width: 375px;
  background: transparent;
  resize: vertical; 
`;

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  left: 0px;
  width: 375px;
  top: 70px;
  height: 20px;
`;

export default DescripcionNewBox;

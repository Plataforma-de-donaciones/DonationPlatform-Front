import React, { Component } from "react";
import styled, { css } from "styled-components";
import EquipamientoMedicoBox from "./components/EquipamientoMedicoBox";

function Index(props) {
  return (
    <EquipamientoMedicoBox
      style={{
        height: 620,
        width: 400
      }}
    ></EquipamientoMedicoBox>
  );
}

export default Index;

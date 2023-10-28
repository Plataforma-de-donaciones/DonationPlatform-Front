import React from "react";
import styled from "styled-components";
import OfrecimientosSolicitudesButton from "./OfrecimientosSolicitudesButton";
import OfrecimientosComentariosButton from "./OfrecimientosComentariosButton";

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0.35px rgba(0, 0, 0, 1);
  width: 300px; /* Ajusta el ancho según tus necesidades */
  height: 200px; /* Ajusta la altura según tus necesidades */
  margin: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Donacion1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  text-align: center;
  margin-left: 92px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 67px;
  width: 550px;
  font-size: 10px;
`;

const EstadoPendiente = styled.span`
  font-family: Roboto;
  top: 56px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 500;
  color: #121212;
  height: 11px;
  width: 108px;
  text-align: left;
  font-size: 10px;
`;

const LoremIpsumStack = styled.div`
  width: 550px;
  height: 67px;
  position: relative;
`;

const Xx = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  margin-top: 10px;
`;

const X33 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  margin-left: 30px;
  margin-top: 10px;
`;

const XxRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-left: 130px;
  margin-right: 130px;
`;

const Donacion1Column = styled.div`
  width: 550px;
  flex-direction: column;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  object-fit: contain;
  display: flex;
  flex-direction: column;
`;

const Donacion1ColumnRow = styled.div`
  height: 120px;
  flex-direction: row;
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 10px;
`;

function OfrecimientoPropioBox({ don_name, don_description, don_attachment, request_count, ...props }) {
  return (
    <Container {...props}>
      <Donacion1ColumnRow>
        <Donacion1Column>
          <Donacion1>{don_name}</Donacion1>
          <LoremIpsumStack>
            <LoremIpsum>{don_description}</LoremIpsum>
            <EstadoPendiente>Estado: Pendiente</EstadoPendiente>
          </LoremIpsumStack>
          <XxRow>
            <Xx>{request_count}</Xx>
            <OfrecimientosSolicitudesButton
              style={{
                height: 36,
                width: 100,
                marginLeft: 11,
              }}
            ></OfrecimientosSolicitudesButton>
            <X33>1</X33>
            <OfrecimientosComentariosButton
              style={{
                height: 36,
                width: 100,
                marginLeft: 11,
              }}
            ></OfrecimientosComentariosButton>
          </XxRow>
        </Donacion1Column>
        <Image src={don_attachment} alt="Donation Image"></Image>
      </Donacion1ColumnRow>
    </Container>
  );
}

export default OfrecimientoPropioBox;


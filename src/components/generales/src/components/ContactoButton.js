import styled from "styled-components";

function ContactoButton(props) {

  const handleClick = () => {

    console.log("Botón Contacto clickeado");
  };

  return (
    <Container {...props} onClick={handleClick}>
      <Contacto>Contacto</Contacto>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  border: none; /* Elimina el borde predeterminado de los botones */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa por encima */
`;

const Contacto = styled.span`
  color: rgba(100,100,100, 1);
  font-size: 14px;
  font-weight: 500;
  &:hover {
    color: #FFFFFF;
  }
`;

export default ContactoButton;

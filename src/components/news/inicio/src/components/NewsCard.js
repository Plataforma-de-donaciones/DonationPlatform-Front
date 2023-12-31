import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #ffcc80; /* Color naranja claro */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 500px; 
  height: 300px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Efecto de escala en el hover */
  }
`;

const Title = styled.h3`
  color: #333; /* Color del texto */
`;

const Description = styled.p`
  color: #666; /* Color del texto */
`;

const NewsCard = ({ news }) => {
 
  if (!news) {
    return null; 
  }

  return (
    <CardContainer>
      <Title>{news.new_name}</Title>
      <Description>{news.new_description}</Description>
      {/* Otros detalles de la tarjeta */}
    </CardContainer>
  );
};

export default NewsCard;

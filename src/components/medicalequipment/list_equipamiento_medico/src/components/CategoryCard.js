import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";

const CardContainer = styled.div`
  background-color: rgba(221,221,221, 1);
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  min-width: 200px;

  @media(max-width: 768px){
    width: 90px;
  }

`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media(max-width: 1199px){
    flex-direction: row;
  }

  @media(max-width: 768px){
    flex-wrap : wrap;
  }
`;


const StyledButton = styled.button`
  padding: 8px 10px;
  margin-top: 4px;
  background-color: rgba(141, 202, 170, 1);
  border: 1px solid rgba(141, 202, 170, 1);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-width: 90px;
  transition-duration: 0.4s;
  color: #FFFFFF;
  font-size: 1.1rem;
  font-weight: 500;  
  font-style: arial;
  width: auto;
  margin-top: 1px;

  @media(max-widht: 1199){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
  }  
`;



const CategoryCard = ({ onCategoryClick, onClearCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/categoriesmeq/");
        const uniqueCategories = Array.from(new Set(response.data.map((category) => category.cat_id)));
        const uniqueCategoriesData = uniqueCategories.map((cat_id) =>
          response.data.find((category) => category.cat_id === cat_id)
        );
        setCategories(uniqueCategoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CardContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <strong>Categorías</strong>
      </div>
      <ButtonContainer>
      <button style={{ minWidth: '112px', height: '44px'}} onClick={() => onClearCategory()} className="btn-secondary">Limpiar</button>
      {categories.map((category) => (
        <div key={category.cat_id}>
          <StyledButton onClick={() => onCategoryClick(category.cat_id)}>
            {category.cat_name}
          </StyledButton>
        </div>
      ))}
      </ButtonContainer>
    </CardContainer>
  );
};

export default CategoryCard;

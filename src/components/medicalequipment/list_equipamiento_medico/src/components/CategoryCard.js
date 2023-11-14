import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  grid-row: 3;

  background-color: rgba(141, 202, 170, 0.5);
  border: 1px solid #ddd;
  border-radius: 8px;

  width: 120px;

  @media (max-width: 1350px) {
    grid-row: 1;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 500px;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const StyledButton = styled.button`
  padding: 8px;
  margin: 4px;
  cursor: pointer;
  background-color: rgba(255, 152, 0, 1);
  color: white; /* Color del texto */
  border: none;
  border-radius: 4px;
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
      <div>
        <strong>Categorías</strong>
      </div>
      <button onClick={() => onClearCategory()}>Limpiar</button>
      {categories.map((category) => (
        <div key={category.cat_id}>
          <StyledButton onClick={() => onCategoryClick(category.cat_id)}>
            {category.cat_name}
          </StyledButton>
        </div>
      ))}
    </CardContainer>
  );
};

export default CategoryCard;

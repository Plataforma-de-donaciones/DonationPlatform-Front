import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";

const CardContainer = styled.div`
  background-color: rgba(221,221,221, 1);
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  margin-right: -1rem;
`;

const StyledButton = styled.button`
  padding: 8px;
  margin: 4px;
  cursor: pointer;
  background-color: rgba(79,181,139, 1);
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

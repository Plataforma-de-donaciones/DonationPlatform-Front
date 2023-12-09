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
background-color: rgba(141, 202, 170, 1);
color: #FFFFFF;
border: 1px solid rgba(141, 202, 170, 1);
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

transition-duration: 0.4s;
font-size: 1.1rem;
font-weight: 500;  
font-style: arial;
width: auto;
`;

const CategoryCard = ({ onCategoryClick, onClearCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/categoriesdon/");
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
    <>
      <CardContainer>
        <div>
          <strong>Categorías</strong>
        </div>
        <button onClick={() => onClearCategory()} className="btn-secondary">Limpiar</button>
        {categories.map((category) => (
          <div key={category.cat_id}>
            <StyledButton onClick={() => onCategoryClick(category.cat_id)}>
              {category.cat_name}
            </StyledButton>
          </div>
        ))}
      </CardContainer>
    </>
  );
};

export default CategoryCard;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import EquipamientoMedicoListItem from "./EquipamientoMedicoListItem";
import CategoryCard from "./CategoryCard";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";
import TypeFilterButton from "./TypeFilterButton";
import ClearTypeFilterButton from "./ClearTypeFilterButton";


const cookies = new Cookies();

const EquipamientoMedicoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
`;
const ListAndCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 16px;
  max-width: 800px;
  justify-content: flex-end;
`;
const SearchBarAndAddEquipment = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between; 
  align-items: center;
`;

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 16px;
  max-width: 800px;
  justify-content: flex-end;
`;
const FilterBarForType = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around; 
  align-items: center;
`;
const SearchInput = styled.input`
  padding: 8px;
  margin-right: 8px;
  border: none;
  outline: none;
  flex: 2;
  font-size: 16px;
  background: transparent;
  max-width: 200px;

`;

const SearchIcon = styled.span`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  font-size: 20px;
  color: #007bff;
`;

const AddEquipment = styled.div`
  display: flex;
  align-items: center;
  margin-right: 300px;
  cursor: pointer;
`;

const AddIcon = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #28a745;
  margin-right: 0px;
`;
const Pagination = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const PageButton = styled.button`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#ddd" : "transparent")};
  border: 1px solid #ddd;
`;

const EquipamientoMedicoList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [originalEquipamientoList, setOriginalEquipamientoList] = useState([]);
  const [equipamientoList, setEquipamientoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const token = cookies.get("token");
  
  useEffect(() => {
    const fetchEquipamiento = async () => {
      try {
        let response;
  
        if (selectedCategory !== null) {
          response = await instance.get(`/categoriesmeq/search/${selectedCategory}/`);
          const equipamientoIds = response.data.map((entry) => entry.eq_id);
          const filteredEquipamiento = originalEquipamientoList.filter((equipamiento) =>
            equipamientoIds.includes(equipamiento.eq_id)
          );
  
          // Aplicar el filtro por tipo
          const filteredEquipamientoByType = selectedType
            ? filteredEquipamiento.filter((equipamiento) => equipamiento.type === selectedType)
            : filteredEquipamiento;
  
          // Actualizar el estado equipamientoList con los resultados del filtro
          setEquipamientoList(filteredEquipamientoByType);
        } else {
          response = await instance.get("/medicalequipments/");
          setOriginalEquipamientoList(response.data);
  
          // Aplicar el filtro por tipo
          const equipamientoList = selectedType
            ? response.data.filter((equipamiento) => equipamiento.type === selectedType)
            : response.data;
  
          // Actualizar el estado equipamientoList con los resultados del filtro
          setEquipamientoList(equipamientoList);
        }
      } catch (error) {
        console.error("Error fetching equipamiento médico:", error);
      }
    };
  
    fetchEquipamiento();
  }, [selectedCategory, selectedType, token]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
  };
  const handleTypeClick = (type) => {
    console.log(`Selected type: ${type}`);
    setSelectedType(type);
  };

  const handleSearch = async () => {
    try {
      const response = await instance.post("/medicalequipments/searchbyname/", {
        eq_name: searchTerm,
      });
      setEquipamientoList(response.data);
    } catch (error) {
      console.error("Error searching equipamiento médico:", error);
    }
  };

  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const handleAddEquipmentClick = () => {
    if (isAuthenticated) {
      // El usuario está autenticado, redirige a "/altaequipamiento"
      history.push("/altaequipamiento");
    } else {
      // El usuario no está autenticado, muestra una alerta o realiza la acción necesaria
      alert("Debes iniciar sesión para completar esta acción.");
      // Otra opción: Mostrar un modal de inicio de sesión
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEquipamiento = equipamientoList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(equipamientoList.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <EquipamientoMedicoListContainer>
      <FilterBarContainer>
        <FilterBarForType>
        <TypeFilterButton
            isActive={selectedType === 1}
            onClick={() => handleTypeClick(1)}
          >
              Solicitud
          </TypeFilterButton>
        <TypeFilterButton
            isActive={selectedType === 2}
            onClick={() => handleTypeClick(2)}
          >
              Ofrecimiento
        </TypeFilterButton>
        
        </FilterBarForType>
        <ClearTypeFilterButton onClick={() => handleTypeClick(null)}>
          Borrar Filtro
          </ClearTypeFilterButton>
      </FilterBarContainer>
      <SearchBarContainer>
        <SearchBarAndAddEquipment>
        <AddEquipment onClick={handleAddEquipmentClick}>
          <AddIcon>
            <FontAwesomeIcon icon={faPlus} />
          </AddIcon>
          Agregar equipamiento
        </AddEquipment>
          <SearchInput
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </SearchBarAndAddEquipment>
      </SearchBarContainer>
      <ListAndCategoryContainer>
      <ListContainer>
        {currentEquipamiento.map((equipamiento) => (
          <EquipamientoMedicoListItem key={equipamiento.eq_id} equipamiento={equipamiento} />
        ))}

        {/* Paginación */}
        <Pagination>
          <PageButton onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </PageButton>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PageButton
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton onClick={nextPage} disabled={currentPage === totalPages}>
            Siguiente
          </PageButton>
        </Pagination>
      </ListContainer>

      <CategoryCard
        onCategoryClick={handleCategoryClick}
        onClearCategory={handleClearCategory}
      />
      </ListAndCategoryContainer>
    </EquipamientoMedicoListContainer>
  );
};

export default EquipamientoMedicoList;

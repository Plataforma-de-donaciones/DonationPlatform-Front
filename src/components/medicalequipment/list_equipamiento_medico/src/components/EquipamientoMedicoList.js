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
  flex-direction : column;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  padding: 32px;
  margin-top: 0px;
  border-radius: 8px;

  position: relative; /* Agrega esta propiedad */

  @media (max-width: 1350px) {
    display: grid;
    grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
  }
`;

const FilterBarContainer = styled.div`
  justify-content: center;
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 16px;
  margin-left: 10px;

  @media (min-width: 1350px) {
    display: flex;
  }
  @media (max-width: 1350px) {
    grid-row: 1;
    display: grid;
  }
`;

const FilterBarForType = styled(TypeFilterButton)`
  display: flex;
  flex-direction : row; 
  justify-content: flex-start;
  background-color: transparent;
  width: 500px;
  margin-right: -140px;

  @media (max-width: 1350px) {
    grid-row: 1;
  }
`;

const TypeFilterButton1 = styled(TypeFilterButton)`
  justify-content: center;
  align-items: center;
  flex-direction : row; 
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;

  &:hover {
    background-color: rgba(79,181,139, 1);
  }
`;

const TypeFilterButton2 = styled(TypeFilterButton)`
  justify-content: center;
  align-items: center;
  flex-direction : row; 
  width: 120px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;

  &:hover {
    background-color: rgba(79,181,139, 1);
  }

`;

const ClearTypeFilterButton1 = styled(ClearTypeFilterButton)`
  justify-content: center;
  align-items: center;
  flex-direction : row; 
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: -113px;
  margin-top: 0px;

  &:hover {
    background-color:  rgba(100,100,100, 1);
  }

  @media (max-width: 1350px) {
    width: 100px;
    grid-row: 1;
  }
`;






const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 16px;
  max-width: 800px;
  justify-content: flex-end;
  grid-row: 2;
`;

const SearchBarAndAddEquipment = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between; 
  align-items: center;
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

const CategoryBox = styled(CategoryCard)`

`;

const ListAndCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 6px;
  margin-left: 8px;
  margin-right: 8px;
  grid-row: 3;

  @media (max-width: 1350px) {
    display: grid;
    grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea a la izquierda */
  flex: 1; /* Ajuste de flex para ocupar el espacio disponible */

  @media (max-width: 1350px) {
    grid-row: 2;
    margin-bottom: 20px;
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  padding-left: 8px;
`;

const PageButton = styled.button`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "rgba(221,221,221, 1)" : "transparent")};
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
          <TypeFilterButton1
            isActive={selectedType === 1}
            onClick={() => handleTypeClick(1)}
          >
              Solicitud
          </TypeFilterButton1>
          <TypeFilterButton2
            isActive={selectedType === 2}
            onClick={() => handleTypeClick(2)}
          >
              Ofrecimiento
          </TypeFilterButton2>
        </FilterBarForType>
        <ClearTypeFilterButton1 onClick={() => handleTypeClick(null)}>
          Borrar Filtro
          </ClearTypeFilterButton1>
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

      <CategoryBox
        onCategoryClick={handleCategoryClick}
        onClearCategory={handleClearCategory}
      />
      </ListAndCategoryContainer>
    </EquipamientoMedicoListContainer>
  );
};

export default EquipamientoMedicoList;

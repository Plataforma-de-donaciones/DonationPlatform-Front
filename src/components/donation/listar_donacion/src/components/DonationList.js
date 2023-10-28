import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import DonationListItem from "./DonationListItem";
import CategoryCard from "./CategoryCard";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";
import TypeFilterButton from "./TypeFilterButton";
import ClearTypeFilterButton from "./ClearTypeFilterButton";


const cookies = new Cookies();

const DonationListContainer = styled.div`
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
  justify-content: space-between; /* Alinea los elementos a los extremos */
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

const DonationList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [originalDonationList, setOriginalDonationList] = useState([]);
  const [donationList, setDonationList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const token = cookies.get("token");

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        let response;

        if (selectedCategory !== null) {
          response = await instance.get(`/categoriesdon/search/${selectedCategory}/`);
          const donationIds = response.data.map((entry) => entry.don_id);
          const filteredDonation = originalDonationList.filter((donation) =>
            donationIds.includes(donation.don_id)
          );
          const filteredDonationByType = selectedType
            ? filteredDonation.filter((donation) => donation.type === selectedType)
            : filteredDonation;
  
          setDonationList(filteredDonationByType);
        } else {
          response = await instance.get("/donations/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setOriginalDonationList(response.data);

          const donationList = selectedType
          ? response.data.filter((donation) => donation.type === selectedType)
          : response.data;

          setDonationList(donationList);
        }
      } catch (error) {
        console.error("Error fetching donaciones:", error);
      }
    };

    fetchDonation();
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
      const response = await instance.post("/donations/searchbyname/", {
        don_name: searchTerm,
      });
      setDonationList(response.data);
    } catch (error) {
      console.error("Error searching donation:", error);
    }
  };

  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const handleAddDonationClick = () => {
    if (isAuthenticated) {
      // El usuario está autenticado, redirige a "/altaequipamiento"
      history.push("/altadonacion");
    } else {
      // El usuario no está autenticado, muestra una alerta o realiza la acción necesaria
      alert("Debes iniciar sesión para completar esta acción.");
      // Otra opción: Mostrar un modal de inicio de sesión
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonation = donationList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(donationList.length / itemsPerPage);

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
    <DonationListContainer>
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
        <AddEquipment onClick={handleAddDonationClick}>
          <AddIcon>
            <FontAwesomeIcon icon={faPlus} />
          </AddIcon>
          Agregar donación
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
        {currentDonation.map((donation) => (
          <DonationListItem key={donation.don_id} donation={donation} />
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
    </DonationListContainer>
  );
};

export default DonationList;

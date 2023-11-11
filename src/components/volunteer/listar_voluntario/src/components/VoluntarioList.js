import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import VoluntarioListItem from "./VoluntarioListItem";
import Cookies from "universal-cookie";
import TypeFilterButton from "./TypeFilterButton";
import ClearTypeFilterButton from "./ClearTypeFilterButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";
import TypeButtons from "./TypeButtons";

const cookies = new Cookies();

const VoluntarioListContainer = styled.div`
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
const FilterPageContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 16px;
  max-width: 800px;
  justify-content: flex-end;
`;
const FilterBarForPage = styled.div`
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

const VoluntarioList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [originalVoluntarioList, setOriginalVoluntarioList] = useState([]);
  const [voluntarioList, setVoluntarioList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const token = cookies.get("token");

  useEffect(() => {
    const fetchVoluntario = async () => {
      try {
        let response;
        if (selectedRating !== null) {
          response = await instance.get(`/volunteers/searchbyrating/${selectedRating}/`);
        } else {
          response = await instance.get("/volunteers/");
        }
        setOriginalVoluntarioList(response.data);
        const voluntarioList = selectedType
            ? response.data.filter((volunteer) => volunteer.type === selectedType)
            : response.data;
        setVoluntarioList(voluntarioList);
      } catch (error) {
        console.error("Error fetching voluntarios:", error);
      }
    };

    fetchVoluntario();
  }, [selectedRating, selectedType, token]);
  
  const handleTypeClick = (type) => {
    console.log(`Selected type: ${type}`);
    setSelectedType(type);
  };

  const handleSearch = async () => {
    try {
      const response = await instance.post("/volunteers/searchbyname/", {
        vol_name: searchTerm,
      });
      setVoluntarioList(response.data);
    } catch (error) {
      console.error("Error searching voluntario:", error);
    }
  };

  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const handleAddDonationClick = () => {
    if (isAuthenticated) {
      history.push("/altavoluntariado");
    } else {
      Swal.fire({
        title: 'Debes iniciar sesión para completar esta acción',
        text: '¿Desea ir al login en este momento?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/login');
        }
      });
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVoluntario = voluntarioList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(voluntarioList.length / itemsPerPage);

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
    <VoluntarioListContainer>
      <FilterPageContainer>
        <FilterBarForPage>
        <TypeButtons></TypeButtons>
        </FilterBarForPage>
      </FilterPageContainer>
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
            Agregar voluntariado
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
      <ListContainer>
        {currentVoluntario.map((volunteer) => (
          <VoluntarioListItem key={volunteer.vol_id} volunteer={volunteer} />
        ))}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </VoluntarioListContainer>
  );
};

export default VoluntarioList;

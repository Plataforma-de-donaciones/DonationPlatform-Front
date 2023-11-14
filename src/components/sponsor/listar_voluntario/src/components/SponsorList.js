import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import SponsorListItem from "./SponsorListItem";
import Cookies from "universal-cookie";
import TypeFilterButton from "./TypeFilterButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";
import TypeButtons from "../../../../volunteer/listar_voluntario/src/components/TypeButtons";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const cookies = new Cookies();

const SponsorListContainer = styled.div`
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

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 16px;
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
  justify-content: center;
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

const SponsorList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [originalSponsorList, setOriginalSponsorList] = useState([]);
  const [sponsorList, setSponsorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const token = cookies.get("token");

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        let response;
        if (selectedRating !== null) {
          response = await instance.get(`/sponsors/searchbyrating/${selectedRating}/`);
        } else {
          response = await instance.get("/sponsors/");
        }
        setOriginalSponsorList(response.data);
        const sponsorList = selectedType
          ? response.data.filter((sponsor) => sponsor.type === selectedType)
          : response.data;
        setSponsorList(sponsorList);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchSponsor();
  }, [selectedRating, selectedType, token]);

  const handleTypeClick = (type) => {
    console.log(`Selected type: ${type}`);
    setSelectedType(type);
  };

  const handleSearch = async () => {
    try {
      const response = await instance.post("/sponsors/searchbyname/", {
        sponsor_name: searchTerm,
      });
      setSponsorList(response.data);
    } catch (error) {
      console.error("Error searching sponsor:", error);
    }
  };

  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const handleAddDonationClick = () => {
    if (isAuthenticated) {
      history.push("/altasponsor");
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
  const currentSponsor = sponsorList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sponsorList.length / itemsPerPage);

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
    <SponsorListContainer>
      <TypeButtons />

      <SearchBarContainer>
        <SearchBarAndAddEquipment>
          <AddEquipment onClick={handleAddDonationClick}>
            <AddIcon>
              <FontAwesomeIcon icon={faPlus} />
            </AddIcon>
            Agregar apadrinamiento
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
            onClick={() => handleTypeClick(2)}>
            Ofrecimiento
          </TypeFilterButton>

        </FilterBarForType>

        <Button onClick={() => handleTypeClick(null)} variant="outline-danger" >Borrar Filtro</Button>{' '}
  
      </FilterBarContainer>

      <ListContainer>
        {currentSponsor.map((sponsor) => (
          <SponsorListItem key={sponsor.sponsor_id} sponsor={sponsor} />
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
    </SponsorListContainer>
  );
};

export default SponsorList;

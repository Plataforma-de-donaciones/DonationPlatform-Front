import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import SponsorListItem from "./SponsorListItem";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";
import TypeButtons from "../../../../volunteer/listar_voluntario/src/components/TypeButtons";
import Swal from "sweetalert2";
import { Button, Row } from "react-bootstrap";
import EncabezadoListado from "../../../../generales/src/components/layout/EncabezadoListado";

const cookies = new Cookies();

const SponsorListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
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
  const itemsPerPage = 6;
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

      <EncabezadoListado
        onActionSolicitud={() => handleTypeClick(1)}
        onActionOfrecimiento={() => handleTypeClick(2)}
        onActionBorrar={() => handleTypeClick(null)}
        onActionAdd={handleAddDonationClick}
        searchValue={searchTerm}
        searchOnChange={setSearchTerm}
        onSearch={handleSearch}
        textButton={"Agregar apadrinamiento"}
      />

      <Row>
        {currentSponsor.map((sponsor) => (
          <SponsorListItem key={sponsor.sponsor_id} sponsor={sponsor} />
        ))}
      </Row>

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
    </SponsorListContainer>
  );
};

export default SponsorList;

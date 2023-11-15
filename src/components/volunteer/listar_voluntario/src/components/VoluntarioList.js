import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import VoluntarioListItem from "./VoluntarioListItem";
import Cookies from "universal-cookie";
import TypeFilterButton from "./TypeFilterButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";
import TypeButtons from "./TypeButtons";
import { Button, Row } from "react-bootstrap";
import EncabezadoListado from "../../../../generales/src/components/layout/EncabezadoListado";

const cookies = new Cookies();

const VoluntarioListContainer = styled.div`
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

const VoluntarioList = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
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
      <TypeButtons />

      <EncabezadoListado
        onActionSolicitud={() => handleTypeClick(1)}
        onActionOfrecimiento={() => handleTypeClick(2)}
        onActionBorrar={() => handleTypeClick(null)}
        onActionAdd={handleAddDonationClick}
        searchValue={searchTerm}
        searchOnChange={setSearchTerm}
        onSearch={handleSearch}
        textButton={"Agregar voluntariado"}
      />

      <Row>
        {currentVoluntario.map((volunteer) => (
          <VoluntarioListItem key={volunteer.vol_id} volunteer={volunteer} />
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

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
import { toast, ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";
import { Button, Col, Row } from "react-bootstrap";
import EncabezadoListado from "../../../../generales/src/components/layout/EncabezadoListado";

const cookies = new Cookies();

const EquipamientoMedicoListContainer = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  padding: 32px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;

  @media (min-width: 768px) {

  }
`;

const ListAndCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
  flex:1;
  margin-bottom: 16px;

  @media (max-width: 1399px) {
    flex-direction: column;
  }
`;

const List = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
`;

const EqMedicoListItem = styled(EquipamientoMedicoListItem)`

`;
const CategoryCard1 = styled(CategoryCard)`
  flex: 2;
`;

const Row2 = styled(Row)`

  gap: 16px; /* Espaciado entre elementos */
  margin-right: 16px;

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
  margin-top: 18px;
`;

const PageButton = styled.button`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#ddd" : "transparent")};
  border: 1px solid #ddd;
`;

const EquipamientoMedicoList = () => {
  const itemsPerPage = 6;
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

          const filteredEquipamientoByType = selectedType
            ? filteredEquipamiento.filter((equipamiento) => equipamiento.type === selectedType)
            : filteredEquipamiento;

          setEquipamientoList(filteredEquipamientoByType);
        } else {
          response = await instance.get("/medicalequipments/");
          setOriginalEquipamientoList(response.data);

          const equipamientoList = selectedType
            ? response.data.filter((equipamiento) => equipamiento.type === selectedType)
            : response.data;

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

      <EncabezadoListado
        onActionSolicitud={() => handleTypeClick(1)}
        onActionOfrecimiento={() => handleTypeClick(2)}
        onActionBorrar={() => handleTypeClick(null)}
        onActionAdd={handleAddEquipmentClick}
        searchValue={searchTerm}
        searchOnChange={setSearchTerm}
        onSearch={handleSearch}
        textButton={'Agregar equipamiento'}
      />

      <ListAndCategoryContainer>

        <ListContainer>
          <Row>
            <Col className="col-12 col-sm-12 col-xl-2 col-md-12 order-xl-2 order-sm-1 order-md-1 mb-3 mt-3 d-flex flex-row flex-sm-column">
              <CategoryCard
                onCategoryClick={handleCategoryClick}
                onClearCategory={handleClearCategory}
              />
            </Col>
            <Col className="col-12 col-sm-12 col-xl-10 col-md-12 order-xl-1 order-sm-2 order-md-2 mb-3 mt-3">
              <Row>
                {currentEquipamiento.map((equipamiento) => (
                  <EquipamientoMedicoListItem key={equipamiento.eq_id} equipamiento={equipamiento} />
                ))}
              </Row>
            </Col>
          </Row>

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

      </ListAndCategoryContainer>

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
    </EquipamientoMedicoListContainer>
  );
};

export default EquipamientoMedicoList;

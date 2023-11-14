import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../axios_instance";
import EventListItem from "./EventListItem";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../../AuthContext";
import { useHistory } from "react-router-dom";

const cookies = new Cookies();

const EventListContainer = styled.div`
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
  max-width: 800px;
  justify-content: flex-end;
`;

const SearchBarAndAddEquipment = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
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

const EventList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [originalEventList, setOriginalEventList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = cookies.get("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await instance.get("/events/");
        setOriginalEventList(response.data);

        const eventList = response.data;
        setEventList(eventList);
      } catch (error) {
        console.error("Error fetching donaciones:", error);
      }
    };

    fetchEvent();
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await instance.post("/events/searchbyname/", {
        event_name: searchTerm,
      });
      setEventList(response.data);
    } catch (error) {
      console.error("Error searching event:", error);
    }
  };

  const formatDateAndTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const handleAddEventClick = () => {
    if (isAuthenticated) {
      history.push("/altaevento");
    } else {
      alert("Debes iniciar sesión para completar esta acción.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvent = eventList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(eventList.length / itemsPerPage);

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
    <EventListContainer>
      <SearchBarContainer>
        <SearchBarAndAddEquipment>
          <AddEquipment onClick={handleAddEventClick}>
            <AddIcon>
              <FontAwesomeIcon icon={faPlus} />
            </AddIcon>
            Agregar evento
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
        {currentEvent.map((evento) => (
          <EventListItem
          key={evento.event_id}
          evento={{
            ...evento,
            formattedDateTime: formatDateAndTime(evento.start_date),
            formattedEndDate: formatDateAndTime(evento.end_date),
          }}
        />
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
    </EventListContainer>
  );
};

export default EventList;

import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from "react-bootstrap";
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ButtonFn from "../ButtonFn";


const Row1 = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
        width:480px;
    }
    @media (width: 576px) {
        width:480px;
    }


`;
const Row2 = styled(Row)`

    @media (max-width: 768px) {
        width:480px;
    }
    @media (width: 576px) {
        width:480px;
    }


`;

const EncabezadoListado = ({ 
    onActionSolicitud, 
    onActionOfrecimiento, 
    textButton, 
    onActionBorrar, 
    onActionAdd, 
    searchValue, 
    onSearch, 
    searchOnChange, 
    showTabs =true}) => {

    return (
        <>
        {showTabs && (
            <Row1>
                <Col xs={12} className="mb-3 text-center">
                    <ButtonFn
                        onAction={onActionSolicitud}
                        name={"Solicitud"}
                        value={1}
                        className="btn-primary"
                    />
                    <ButtonFn
                        onAction={onActionOfrecimiento}
                        name={"Ofrecimiento"}
                        value={2}
                    />
                    <ButtonFn
                        onAction={onActionBorrar}
                        name={"Borrar Filtro"}
                        variant={"outline-secondary"}
                    />
                </Col>
            </Row1>
        )}
        
        <Row2 className="mt-3">
            <Col xs={12} md={6} className="mb-3 d-flex flex-column align-items-left">
                <div className="h-100">
                <Button onClick={onActionAdd} variant="outline-secondary" style={{ height: '100%' }}>
                    <AddIcon style={{ marginRight: '8px' }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </AddIcon>
                    {textButton}
                </Button>
                </div>
            </Col>
            <Col className="col-12 col-sm-12 col-xl-6 col-md-6 col-xs-12 m-auto">
                <div className="h-100">
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Buscar por nombre..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={searchValue}
                        onChange={(e) => searchOnChange(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        <SearchIcon onClick={onSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </SearchIcon>
                    </Button>
                </InputGroup>
                </div>
            </Col>
        </Row2>
        </>
    );
}


const AddEquipment = styled.div`
// display: flex;
// align-items: center;
// margin-right: 300px;
// cursor: pointer;
`;

const AddIcon = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
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

export default EncabezadoListado;
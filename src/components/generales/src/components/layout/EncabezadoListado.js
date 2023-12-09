import ButtonFn from "../ButtonFn";
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from "react-bootstrap";

const EncabezadoListado = ({ onActionSolicitud, onActionOfrecimiento, textButton, onActionBorrar, onActionAdd, searchValue, onSearch, searchOnChange, showTabs =true}) => {
    return (
        <>

        {showTabs && (
            <Row>
            <Col className="col-12 col-sm-12 col-xl-12 col-md-12">
            <div className="mt-3 text-center">
                <ButtonFn
                    onAction={onActionSolicitud}
                    name={"Solicitud"}
                    value={1}
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

            </div >
                    </Col>
                    </Row>
        )}

            <Row className="mt-3">
                <Col className="col-12 col-sm-12 col-xl-6 col-md-6 col-xs-12 mb-3">
                    <Button onClick={onActionAdd} variant="outline-secondary">
                        <AddIcon>
                            <FontAwesomeIcon icon={faPlus} />
                        </AddIcon>
                        {textButton}
                    </Button>
                </Col>

                <Col className="col-12 col-sm-12 col-xl-6 col-md-6 col-xs-12 m-auto">
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
                </Col>


            </Row>
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

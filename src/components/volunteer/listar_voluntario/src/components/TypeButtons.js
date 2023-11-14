import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const TypeButtons = () => {
  const history = useHistory();

  return (

    <ButtonGroup size="lg" className="mb-2">
      <Button onClick={() => history.push("/listadovoluntariado")} className='me-1'>Voluntarios</Button>
      <Button onClick={() => history.push("/listadoapadrinamiento")}>Padrinos</Button>
    </ButtonGroup>
  );
};

export default TypeButtons;

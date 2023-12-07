import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function CancelarButton(props) {
  const history = useHistory();

  const handleClick = () => {
    if (history) {
      history.push("/listadousuarios");
    } else {
      console.warn(
        "La prop 'history' no está presente. No se puede realizar la redirección."
      );
    }
  };

  return (
    <Button variant="secondary" onClick={handleClick} {...props}>
      Cancelar
    </Button>
  );
}

export default CancelarButton;

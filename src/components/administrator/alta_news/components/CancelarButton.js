import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function CancelarButton(props) {
  const history = useHistory();

  const handleClick = () => {
    // Si history está presente, realiza la redirección
    if (history) {
      history.push("/listadonoticias");
    } else {
      // Maneja el caso cuando history no está presente
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

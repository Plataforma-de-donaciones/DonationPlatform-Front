import { Button } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const ButtonFn = ({ onAction, name, variant }) => {
    return (
        <>


            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                {variant &&
                    <Button  onClick={onAction} variant={variant} >
                        {name}
                    </Button>}

                {!variant &&
                    <ToggleButton className="me-4" onClick={onAction} id="tbg-radio-1" value="1">
                        {name}
                    </ToggleButton>
                }

            </ToggleButtonGroup>
        </>
    );
}

export default ButtonFn;
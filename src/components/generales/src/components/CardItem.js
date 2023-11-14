import Card from 'react-bootstrap/Card';

const CardItem = (props) => {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text className="mb-4 ms-2 text-muted text-center">
                        {props.descriptions}
                    </Card.Text>
                    <Card.Subtitle className="mb-4 ms-2 text-muted text-center">Estado: {props.state}</Card.Subtitle>
                    {props.childrens}
                </Card.Body>
            </Card>
        </>
    );
}

export default CardItem;
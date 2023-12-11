import { Col, Image} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const CardItem = (props) => {
    return (
        <>
            {props.isGrid &&
                <Col className='col-xl-4 col-sm-12 col-md-6 col-12 mb-3'>
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title className='font-weight-bold text-center' >{props.name}</Card.Title>
                            {props.image != null
                                &&
                                <div className="text-center">
                                    <img src={props.image} className="img-fluid" 
                                    onError={(e) => {
                                        e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwy_FB-xJcIjI4MkODy3cCyEM1zLACOC_LxpKdwSqPpI6IsMAU6inmenuTv9j8fgmfwHk&usqp=CAU';
                                      }}/>
                                </div>
                            }

                            {props.image == null
                                &&
                                <div className="text-center">
                                    <img src="https://www.nosso.com/public/images/tipoproducto/default.jpg" className="img-fluid" ></img>
                                </div>
                            }
                            <Card.Text className="mb-4 ms-2 text-muted text-center">
                                {props.descriptions}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {props.state && <Card.Subtitle className="mb-4 ms-2 text-muted text-center">Estado: {props.state}</Card.Subtitle>}

                            {props.childrens}
                        </Card.Footer>
                    </Card>
                </Col>
            }

            {
                !props.isGrid &&
                
                <Col className='col-xl-6 col-sm-12 col-md-6 col-12 mb-3'>
                    <Card className='h-100 text-center'>
                        <Card.Body>
                            <Card.Title>{props.name}</Card.Title>
                            {props.image != null
                                &&
                                <div className="text-center">
                                    <Image src={props.image} className="img-fluid" 
                                    onError={(e) => {
                                        e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwy_FB-xJcIjI4MkODy3cCyEM1zLACOC_LxpKdwSqPpI6IsMAU6inmenuTv9j8fgmfwHk&usqp=CAU';
                                      }}/>
                                </div>
                            }

                            {props.image == null
                                &&
                                <div className="text-center">
                                    <Image src="https://www.nosso.com/public/images/tipoproducto/default.jpg" className="img-fluid" ></Image>
                                </div>
                            }
                            <Card.Text className="mb-4 ms-2 text-muted text-center">
                                {props.descriptions}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {props.state && <Card.Subtitle className="mb-4 ms-2 text-muted text-center">Estado: {props.state}</Card.Subtitle>}

                            {props.childrens}
                        </Card.Footer>
                    </Card>
                </Col>

}

        </>
    );
}

export default CardItem;
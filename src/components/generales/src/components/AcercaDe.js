import React from "react";
import { Row, Col, Card, CardBody, CardHeader } from "react-bootstrap";
import Layout from "./layout/Layout";

const AcercaDe = () => {
    return (
        <>
            <Layout>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <CardHeader className='text-center'>
                                <h2>Acerca de nosotros</h2>
                            </CardHeader>
                            <CardBody>
                            <div className="row featurette">
                                   
                                    <div className="col-md-5">
                                        <img className="featurette-image img-fluid mx-auto img-responsive " data-src="holder.js/500x500/auto" alt="500x500" src="https://www.educaciontrespuntocero.com/wp-content/uploads/2019/12/2346_filesizer_-scaled-1.jpg.webp" data-holder-rendered="true"/>
                                    </div>
                                    <div className="col-md-7">
                                        <h2 className="featurette-heading">Quienes somos</h2>
                                        <p className="lead">Somos un equipo de estudiantes de la carrera Licenciatura en tecnologías de la información de la Universidad Tecnologica del Uruguay UTEC, pertenecemos al equipo QueensCoders y somos las creadoras de DonacionesUy.</p>

                                        <p className="lead">En DonacionesUy, nos esforzamos por ser el nexo que conecte personas y organizaciones con buenas intenciones, creando un punto de encuentro donde las acciones solidarias pueden florecer.</p>


                                        <p className="lead">Cada miembro de nuestro equipo aporta habilidades únicas y una dedicación compartida para hacer que DonacionesUy sea una plataforma intuitiva, efectiva y segura.</p>

                                    </div>
                                </div>
                                <hr/>
                               
                                <div className="row featurette">
                                    <div className="col-md-7">
                                        <h2 className="featurette-heading">Misión</h2>
                                        <p className="lead">Nuestra mision es crear un espacio que impulse el cambio positivo en nuestra sociedad. Creemos en el poder de la colaboración y la solidaridad para crear un impacto duradero.</p>

                                    </div>
                                    <div className="col-md-5">
                                        <img className="featurette-image img-fluid mx-auto img-responsive " data-src="holder.js/500x500/auto" alt="500x500" src="https://blog.oxfamintermon.org/wp-content/uploads/2016/08/ser-solidario-726x484.jpg" data-holder-rendered="true"/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row featurette">
                                <div className="col-md-5">
                                        <img className="featurette-image img-fluid mx-auto img-responsive" data-src="holder.js/500x500/auto" alt="500x500" src="https://www.feuso.es/images/img/salud/solidaridad-manos.jpg" data-holder-rendered="true"/>
                                    </div>
                                    <div className="col-md-7">
                                        <h2 className="featurette-heading">Visión</h2>
                                        <p className="lead">Nuestra visión es contribuir al desarrollo social, promover la igualdad de oportunidades, defender los derechos humanos, fomentar la cultura, proteger el medio ambiente y los animales, entre otros objetivos.</p>

                                    </div>
                                    <hr/>
                                </div>
                                <div className="row featurette">
                                <div className="col-md-7">
                                        <h2 className="featurette-heading">Gracias</h2>
                                        <p className="lead">Gracias por unirte a nosotras en este viaje. Juntos, podemos lograr un impacto significativo y positivo en la sociedad.</p>
                                        <p className="lead">Te invitamos a ser parte del cambio.</p> 
                                    </div>
                                <div className="col-md-5">
                                        <img className="featurette-image img-fluid mx-auto img-responsive" data-src="holder.js/500x500/auto" alt="500x500" src="https://amiab.com/wp-content/uploads/2020/03/GRACIAS.jpg" data-holder-rendered="true"/>
                                    </div>
                                  

                                </div>
                                <hr/>
                            </CardBody>

                            <CardBody>
                                <div className="text-center pb-4">
                                    <h2>Equipo QueensCoders</h2>
                                    <p>Aquí te presentamos a las mentes creativas detrás de DonacionesUy:</p>

                                </div>

                                {/* Integrante 1 */}
                                <Row className="mx-auto">
                                    <Col className="mx-5">
                                        <Card style={{ width: '18rem', border:'none'}}>
                                            <Card.Img className="rounded-circle" variant="top" src="https://media.licdn.com/dms/image/D4D03AQG_29LpSXa76g/profile-displayphoto-shrink_200_200/0/1670334846527?e=1705536000&v=beta&t=cwWA85L9OLj-9e70BDWtG7--BCYD-0ZO13EUHEXCoWE" />
                                            <Card.Body>
                                                <Card.Title>Fátima Caballero</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col style={{marginLeft:'50px'}}>
                                    <div className="text-center" style={{ width: '18rem', border:'none'}}>
                                            <Card.Img className="rounded-circle" variant="top" src="https://media.licdn.com/dms/image/C4E03AQGugBOfCmo5bg/profile-displayphoto-shrink_800_800/0/1619408759611?e=1705536000&v=beta&t=BOFuOSJaHljPQWnhCoGLSG8HmzHAqIUtopHPz2O2t6s" />
                                            <Card.Body>
                                                <Card.Title>Camila Celentano</Card.Title>
                                            </Card.Body>
                                        </div>
                                    </Col>

                                    <Col style={{marginLeft:'50px'}}>
                                    <Card style={{ width: '18rem', border:'none'}}>
                                            <Card.Img className="rounded-circle" variant="top" src="https://media.licdn.com/dms/image/C4E03AQHkynnOnbG6nQ/profile-displayphoto-shrink_200_200/0/1517375496234?e=1705536000&v=beta&t=RR-iwFRnu4ksSDtEqBlmY0V-wFtzKJwOaxp6rYlqm4Q" />
                                            <Card.Body>
                                                <Card.Title>Taina Garabelli</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>

            </Layout>
        </>

    );


}



export default AcercaDe;

import Layout from "./layout/Layout";
import React from "react";
import { Row, Col, Card, CardBody, CardHeader } from "react-bootstrap";

const Contacto = () => {
    return (  
        <Layout>
             <Row>
                    <Col>
                        <Card className='mt-5'>
                            <CardHeader className='text-center'>
                                <h4>Contáctenos</h4>
                            </CardHeader>
                            <CardBody className="text-center">
                    
                                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdJ1YytxV9IXt_eTOBAXXHDP58XP_waN207BMz3zuUGhTf6ZA/viewform?embedded=true" width="900px" height="1350" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
                          
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        </Layout>
    );
}

export default Contacto;
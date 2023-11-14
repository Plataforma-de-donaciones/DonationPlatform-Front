import React from "react";
import { Row, Col, Card, Container, CardBody, CardHeader } from "react-bootstrap";
import Layout from './layout/Layout';

const TerminosCondiciones = () => {
    return (
        <>
            <Layout>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <CardHeader className='text-center'>
                                <h2>Términos y condiciones</h2>
                            </CardHeader>
                            <CardBody>
                                <p>
                                    Todas las personas y organizaciones (de ahora en más USUARIOS) que utilicen el sitio web <a href="https://donacionesuy.azurewebsites.net" target="_blank"> donacionesuy.azurewebsites.net</a>  (de ahora en más el PLATAFORMA) o cualquier URL que derive en la misma, dejan constancia a través de su registro que aceptan los Términos y Condiciones de DonacionesUy.
                                    Asimismo, el usuario entiende, acepta y se compromete a respetar la política de privacidad asociada a los términos y condiciones.
                                </p>


                                <p>
                                    DonacionesUy es una plataforma sin fines de lucro cuyo objetivo es contribuir al desarrollo social mediante el impulso de causas benéficas. Buscamos promover la igualdad de oportunidades, defender los derechos humanos, fomentar la cultura, proteger el medio ambiente y los animales, entre otros objetivos relacionados. La plataforma será el nexo entre las personas y organizaciones con buenas intenciones que deseen realizar acciones solidarias dentro del territorio nacional de la Republica Oriental del Uruguay.
                                </p>

                                <h4>Referente al voluntario, voluntaria y/o donante</h4>

                                <p>
                                    DonacionesUy promueve que el USUARIO se involucre en la causa que persiguen las organizaciones y que su acción sea más que una simple ayuda. Al utilizar el SITIO, el USUARIO se compromete a actuar de manera generosa, contribuyendo al desarrollo social y persiguiendo objetivos como la igualdad de oportunidades, la defensa de los derechos humanos, la promoción de la cultura, la protección del medio ambiente y los animales, u otros objetivos afines.
                                </p>

                                <p>
                                    Todo INDIVIDUO dispuesto a suministrar recursos a las organizaciones que publican necesidades en DonacionesUy, ya sea tiempo de voluntariado, donaciones en general o apadrinamientos, acepta no tener derecho a ningún reclamo de recompensa por el tiempo, bienes o materiales brindados a la ORGANIZACIÓN. Se reconoce que no existe un vínculo laboral entre el USUARIO y la ORGANIZACIÓN. Los USUARIOS deben cumplir con los compromisos asumidos, respetar los fines y normativas de la ORGANIZACIÓN y participar en las capacitaciones proporcionadas que la organización considere pertinentes.
                                </p>

                                <p>
                                    DonacionesUy no es responsable por los daños y perjuicios que puedan surgir, incluyendo, sin límite, daños, pérdidas o gastos directos, indirectos, que surjan en relación con el uso o la imposibilidad de uso de la PLATAFORMA, en relación con cualquier falla en el vencimiento, error, omisión, interrupción, defecto, demora en la operación o falla del sistema, aun en el caso de que DonacionesUy informara sobre la posibilidad de dichos daños o perjuicios.
                                </p>

                                {/* ... Resto de los términos y condiciones ... */}

                                <h4>Política de privacidad</h4>

                                <p>
                                    DonacionesUy desarrolla la plataforma para su uso en forma libre y gratuita, con el propósito de proporcionar un espacio para la realización de acciones solidarias en el territorio nacional de la Republica Oriental del Uruguay.
                                </p>

                                {/* ... Resto de la política de privacidad ... */}

                                <p>
                                    DonacionesUy no se responsabiliza de comprobar la veracidad de los datos de las ORGANIZACIONES y USUARIOS registrados en en la PLATAFORMA. Asimismo, DonacionesUy tiene la potestad de revisar y NO visibilizar publicaciones que contengan comentarios negativos dentro de la PLATAFORMA escritos por los USUARIOS.
                                </p>
                                <p>
                                    DonacionesUy se reserva el derecho a modificar los Términos y Condiciones en cualquier momento sin previo aviso.
                                </p>

                                <p>
                                    En DonacionesUy, reconocemos la importancia de la privacidad de nuestros usuarios y nos comprometemos a proteger la confidencialidad de la información proporcionada. Al utilizar nuestra plataforma, el usuario acepta la responsabilidad de mantener la confidencialidad de su cuenta y contraseña, y se compromete a no compartir información sensible con terceros no autorizados.
                                </p>

                                <p>
                                    Para garantizar una experiencia segura, le recomendamos a los usuarios que eviten divulgar información personal sensible, como detalles financieros, contraseñas u otra información que pueda comprometer su seguridad. DonacionesUy nunca solicitará información confidencial a través de medios no seguros ni compartirá dicha información con terceros sin el consentimiento expreso del usuario.
                                </p>

                                <p>
                                    Los usuarios son alentados a ser conscientes de los riesgos asociados con la divulgación de información personal en línea y a utilizar prácticas seguras al interactuar en la plataforma. DonacionesUy no se hace responsable por la divulgación voluntaria de información personal por parte de los usuarios a otros usuarios o terceros.
                                </p>


                            </CardBody>


                        </Card>
                    </Col>
                </Row>

            </Layout>
        </>

    );


}



export default TerminosCondiciones;

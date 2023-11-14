import React from "react";
import { Row, Col, Card, CardBody, CardHeader } from "react-bootstrap";
import Layout from './layout/Layout';

const PreguntasFrecuentes = () => {
    return (
        <>
            <Layout>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <CardHeader className='text-center'>
                                <h2>Preguntas frecuentes</h2>
                            </CardHeader>
                            <CardBody>

                                <div id="collapsePreguntas" class="collapse show" aria-labelledby="preguntasFrecuentes" data-parent="#accordion">
                                    <div class="card-body">
                                        <strong>1. ¿Qué es DonacionesUy y cómo funciona?</strong>
                                        <p>DonacionesUy es una plataforma sin fines de lucro que conecta a individuos y organizaciones con buenas intenciones para impulsar causas benéficas. Funciona como un espacio centralizado para publicar oportunidades de voluntariado y necesidades de donaciones.</p>

                                        <strong>2. ¿Cómo puedo ser voluntario/a o hacer donaciones a través de la plataforma?</strong>
                                        <p>Para ser voluntario/a o hacer donaciones, simplemente regístrate en nuestra plataforma. Explora las oportunidades publicadas por organizaciones y únete a las que te interesen. Para donar, elige una organización y sigue las instrucciones para realizar tu contribución.</p>

                                       
                                        <strong>3. ¿Cuáles son los objetivos de DonacionesUy?</strong>
                                        <p>DonacionesUy busca contribuir al desarrollo social, promover la igualdad de oportunidades, defender los derechos humanos, fomentar la cultura, proteger el medio ambiente y los animales, entre otros objetivos. Es un punto de encuentro para acciones solidarias en Uruguay.</p>

                                        <strong>4. ¿Qué se espera de los voluntarios/as registrados?</strong>
                                        <p>Se espera que los voluntarios/as se involucren en las causas de las organizaciones, actuando con altruismo. Los voluntarios/as deben cumplir con los compromisos asumidos, respetar las normativas de las organizaciones y participar en las capacitaciones proporcionadas. También se solicita que compartan sus experiencias mediante comentarios.</p>

                                        <strong>5. ¿Qué se espera de las organizaciones registradas?</strong>
                                        <p>Se espera que las organizaciones mantengan a los voluntarios/as y donantes involucrados en sus causas. Las publicaciones deben tener un fin altruista y estar alineadas con los objetivos de DonacionesUy. El uso comercial de la plataforma está prohibido. Las organizaciones deben responder a las solicitudes de voluntariado y donaciones, manteniendo la confidencialidad de los datos recibidos.</p>

                                        <strong>6. ¿Cómo garantiza DonacionesUy la seguridad de la información?</strong>
                                        <p>DonacionesUy utiliza medidas de seguridad comercialmente aceptables para proteger la información personal proporcionada. Sin embargo, ten en cuenta que ningún método de transmisión por internet es 100% seguro. Se recomienda revisar nuestra Política de Privacidad para obtener más detalles.</p>

                                        <strong>7. ¿Cómo se realizan modificaciones en los Términos y Condiciones?</strong>
                                        <p>DonacionesUy se reserva el derecho de modificar los Términos y Condiciones en cualquier momento. Las modificaciones se anunciarán mediante avisos en la plataforma. Se recomienda a los usuarios verificar periódicamente posibles cambios. Las modificaciones se consideran aceptadas si no hay objeciones en un plazo de 15 días desde su publicación.</p>

                                        <strong>8. ¿Qué responsabilidad asume DonacionesUy?</strong>
                                        <p>DonacionesUy no asume responsabilidad por daños derivados del mal uso de la plataforma, daños a la propiedad intelectual, infracciones, delitos u otros ilícitos cometidos por usuarios. Consulta nuestros Términos y Condiciones para obtener información detallada sobre la limitación de responsabilidad.</p>

                                        <strong>9. ¿Cómo puedo contactar a DonacionesUy en caso de incumplimientos?</strong>
                                        <p>Si notas incumplimientos de Términos y Condiciones por parte de otros usuarios u organizaciones, escríbenos a <a href="mailto:donacionesuy.queenscoders@gmail.com">donacionesuy.queenscoders@gmail.com</a>. Tu colaboración es fundamental para mantener el buen uso de la plataforma.</p>
                                        
                                        <strong>10. ¿Cómo puedo contactar al equipo de DonacionesUy para obtener ayuda?</strong>
                                        <p>Si necesitas ayuda o tienes preguntas adicionales, contáctanos a través del formulario en el apartado <a href="https://donacionesuy.azurewebsites.net/contacto">Contacto</a> o por la casilla de email <a href="mailto:donacionesuy.queenscoders@gmail.com">donacionesuy.queenscoders@gmail.com</a></p>
                                    </div>
                                </div>



                            </CardBody>


                        </Card>
                    </Col>
                </Row>

            </Layout>
        </>

    );


}



export default PreguntasFrecuentes;

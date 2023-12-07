

const CardBoostrap = ({titulo, descripcion}) => {
    return ( 
        <Card className='mt-5'>
                                <CardHeader className='text-center'>
                                    <h4>{titulo}</h4>
                                </CardHeader>
                                <CardBody>
                                    {descripcion}
                                </CardBody>

                            </Card>
     );
}
 
export default CardBoostrap;
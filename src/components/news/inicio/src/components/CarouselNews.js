import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

const CarouselNews = ({ news }) => {

  return (
    <Carousel data-bs-theme="dark">
      {news.map(function (noticia) {
        return (
          <Carousel.Item>
            
            <div style={{ width: '1500px', height: '300px', backgroundColor: 'rgba(190, 219, 57, 1)', marginTop:'30px' }}></div>

            <Carousel.Caption>
              <h5>{noticia.new_name}</h5>
              <p>{noticia.new_description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}

    </Carousel>
  );

}

export default CarouselNews;
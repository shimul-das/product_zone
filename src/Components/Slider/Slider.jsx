import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from './../../assets/image/slider-1.jpg';
import slider2 from './../../assets/image/slider-2.jpg';
import slider3 from './../../assets/image/slider-3.jpg';
import { Container } from 'react-bootstrap';


function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container className='mt-3 mb-3'>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item style={{ width: "100%", height: "80vh" }}>
          <img
            className="d-block w-100 h-100"
            src={slider1}
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ width: "100%", height: "80vh" }}>
          <img
            className="d-block w-100 h-100"
            src={slider2}
            alt="Second slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ width: "100%", height: "80vh" }}>
          <img
            className="d-block w-100 h-100"
            src={slider3}
            alt="Third slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}


export default Slider;
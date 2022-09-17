import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const ImageCarousel = styled.div`
    max-width: 90%;
    margin: 0 auto;
`

const Slide = styled.div`
    width: 100%;
    /* max-height: 400px; */
    text-align: center;
    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }
`

function Carousel() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return ( 
        <ImageCarousel>
            <Slider {...settings}>
                <Slide>
                    <img src='https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' alt='media' />
                </Slide>
                <Slide>
                    <div>2</div>
                </Slide>
                <Slide>
                    <div>3</div>
                </Slide>
            </Slider>
        </ImageCarousel>
     );
}

export default Carousel;
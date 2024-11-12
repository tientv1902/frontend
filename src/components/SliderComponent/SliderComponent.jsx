import { Image } from 'antd';
import React from 'react';
import Slider from "react-slick";
import './SliderComponent.css'; 

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="slider-wrapper"> 
            <div className="wrapper-slider"> 
                <Slider {...settings}>
                    {arrImages.map((image) => (
                        <Image key={image} src={image} alt="slider" preview={false} width="100%" height="274px" />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SliderComponent;

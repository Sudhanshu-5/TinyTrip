import React, { useState, useEffect} from 'react'
import Card1 from './card1'
import './package.css';


import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}



function part2(props){

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      nextArrow: <SampleNextArrow className="nav-btn next-slide" />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },

        {
          breakpoint: 510,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };



    const [state, setState]= useState([]);
    useEffect(()=>{
        if(typeof(props.data)!=="undefined")
        {
            setState(props.data);
        }
    },[props.data])


        return (
          <div className="container">
            <Slider {...settings}>
                    {
                        state.map(
                            (item,index)=><Card1 key={index} index={index} img={item.img===""?"(-)":item.img.split("uploads")[1]} alt={item.alt} place={item.places.split('-')} detail={item.detail} title={item.name} subtitle={item.subtitle} day={item.duration.split('-')[1]} currency={item.pricing} amount={item.amount} dName={item.destinationName} night={item.duration.split('-')[0]}/>
                        )
                    }
            </Slider>
            </div>
        );
}

export default part2;
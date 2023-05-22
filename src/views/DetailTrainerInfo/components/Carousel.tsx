import React from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import strengImage from '../../../assets/Frame_streg-min.png';

export default function CustomCarousel({images}) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const imageMapping = (images:any) => {
    const a = images?.map((src,i) => <img key={i} alt={`avatar-${i}`} src={src} />);
    return a;
  };
  return (
    <Slider {...settings}>
      {imageMapping(images)}
      {/*<img alt="example" src={strengImage} />*/}
      {/*<img alt="example" src={strengImage} />*/}
      {/*<img alt="example" src={strengImage} />*/}
      {/*<img alt="example" src={strengImage} />*/}
    </Slider>
  );
}

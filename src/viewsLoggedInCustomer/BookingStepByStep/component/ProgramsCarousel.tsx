import React from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Card } from 'antd';
import strengImage from '../../../assets/Frame_streg-min.png';
const { Meta } = Card;

export default function ProgramsCarousel({ programs, onSelect, selectedProgram }) {
  console.log('propgrams prps', programs);
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
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

  return (
    <div style={{ width: 'auto', height: 300 }}>
      <Slider {...settings}>
        {programs?.map((e) => {
          const selected = e._id === selectedProgram?._id;
          const styleBtn = selected ? { color: 'red', fontSize: 15, fontWeight: 500 } : {};
          return (
            <Card
              key={e.serviceName}
              style={{ width: 240, height: 100, borderColor: 'red' }}
              cover={
                <img
                  alt="yoga class"
                  src={e.avatar}
                  style={{ width: '-webkit-fill-available', maxHeight: 100 }}
                />
              }
              actions={[
                <div key="setting" style={styleBtn} onClick={() => onSelect(e)}>
                  {selected ? 'SELECTED' : 'SELECT'}
                </div>,
              ]}
            >
              <Meta title={e.serviceName} description={e.description} />
            </Card>
          );
        })}
      </Slider>
    </div>
  );
}

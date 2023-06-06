import React from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import { Card } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useGymCenters from '@/hooks/useGymCenters';

const { Meta } = Card;
export default function SelectLocationStep({ onSelect, selectedLocations }) {
  const [gymCenters] = useGymCenters({ isDefaultGet: true });
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
        {gymCenters?.map((e) => {
          const selected = e._id === selectedLocations?._id;
          const styleBtn = selected ? { color: 'red', fontSize: 15, fontWeight: 500 } : {};
          return (
            <Card
              key={e.centerName}
              style={{ width: 240, height: 100, borderColor: 'red' }}
              cover={
                <img
                  alt="location"
                  src={e.centerImageMain}
                  style={{ width: '-webkit-fill-available', maxHeight: 100 }}
                />
              }
              actions={[
                <div key="setting" style={styleBtn} onClick={() => onSelect(e)}>
                  {selected ? 'SELECTED' : 'SELECT'}
                </div>,
              ]}
            >
              <Meta title={e.centerName} description={e.centerAddressStr} />
            </Card>
          );
        })}
      </Slider>
    </div>
  );
}

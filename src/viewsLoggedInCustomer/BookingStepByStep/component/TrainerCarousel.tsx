import React from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Card } from 'antd';
import strengImage from '../../../assets/Frame_streg-min.png';
const { Meta } = Card;

export default function TrainerCarousel({ trainers, onSelect, selectedTrainer }) {
  console.log('trainers prps', trainers);
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
  // const imageMapping = (images: any) => {
  //   const a = images?.map((src, i) => <img key={i} alt={`avatar-${i}`} src={src} />);
  //   return a;
  // };
  return (
    <Slider {...settings}>
      {trainers?.map((e) => {
        const selected = e.profile._id === selectedTrainer?._id;
        const styleBtn = selected ? { color: 'red', fontSize: 15, fontWeight: 500 } : {};
        return (
          <Card
            key={e.profile.fullName}
            style={{ width: 240, height: 100, borderColor: 'red' }}
            cover={<img alt="example" src={e.profile.avatar} />}
            actions={[
              <div key="setting" style={styleBtn} onClick={() => onSelect(e.profile)}>
                {selected ? 'SELECTED' : 'SELECT'}
              </div>,
            ]}
          >
            <Meta
              title={e.profile.fullName}
              // description={e.profile.yearExperience + ' years experience'}
            />
            <p>
              <div>{e.profile.yearExperience}+ years experience</div>
            </p>
          </Card>
        );
      })}
    </Slider>
  );
}

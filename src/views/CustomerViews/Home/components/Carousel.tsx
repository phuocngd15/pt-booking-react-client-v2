import React from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import yogaImage from '../../../../assets/Frame_455-min.png';
import nutritionImage from '../../../../assets/Frame_nutri-min.png';
import dancingImage from '../../../../assets/Frame_dance-min.png';
import strengImage from '../../../../assets/Frame_streg-min.png';
import funcImage from '../../../../assets/Frame_func-min.webp';
import pilateImage from '../../../../assets/Frame_456-min.jpg';

const { Meta } = Card;
const CustomCarousel: React.FC = () => {
  const navigate = useNavigate();

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  const onClick = (path: string, groupName: string) => {
    console.log('path ', path);
    navigate(path, { state: { groupName: groupName } });
  };

  return (
    <Slider {...settings}>
      <Card
        cover={<img alt="example" src={strengImage} />}
        actions={[
          <div onClick={() => onClick('/customer/trainers', 'Strength')}>Show trainers</div>,
        ]}
      >
        <Meta title="Strength Training" description="" />
      </Card>
      <Card
        cover={<img alt="example" src={funcImage} />}
        actions={[
          <div onClick={() => onClick('/customer/trainers', 'Functional')}>Show trainers</div>,
        ]}
      >
        <Meta title="Functional Training" description="" />
      </Card>

      <Card
        cover={<img alt="example" src={yogaImage} />}
        actions={[<div onClick={() => onClick('/customer/trainers', 'Yoga')}>Show trainers</div>]}
      >
        <Meta title="Yoga" description="" />
      </Card>

      <Card
        cover={<img alt="example" src={nutritionImage} />}
        actions={[
          <div onClick={() => onClick('/customer/trainers', 'Nutrition')}>Show trainers</div>,
        ]}
      >
        <Meta title="Nutrition" description="" />
      </Card>
      <Card
        cover={<img alt="example" src={dancingImage} />}
        actions={[
          <div onClick={() => onClick('/customer/trainers', 'Dancing')}>Show trainers</div>,
        ]}
      >
        <Meta title="Dancing Workouts" description="" />
      </Card>
      <Card
        cover={<img alt="example" src={pilateImage} />}
        actions={[
          <div onClick={() => onClick('/customer/trainers', 'Pilates')}>Show trainers</div>,
        ]}
      >
        <Meta title="Pilates" description="" />
      </Card>
    </Slider>
  );
};

export default CustomCarousel;

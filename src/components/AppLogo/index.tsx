import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

interface AppLogo {
  className?: string;
  onClickCalBack?: Function;
}
export function AppLogo({ className, onClickCalBack }: AppLogo) {
  const navigate = useNavigate();
  return (
    <img
      className={`logo ${className}`}
      width={38}
      src={logo}
      alt="PT-Booking"
      onClick={() => {
        if (onClickCalBack) {
          onClickCalBack();
        } else navigate('/customer/home');
      }}
    />
  );
}

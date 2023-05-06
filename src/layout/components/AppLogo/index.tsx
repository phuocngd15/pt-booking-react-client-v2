import { memo } from 'react';
import { Image, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import './index.less';

const AppLogo = memo(() => {
  const thme = theme.useToken();
  const navigate = useNavigate();
  return (
    <div className="app-logo cursor-pointer" onClick={() => navigate('/customer/home')}>
      <div className="logo">
        <Image width={38} src={logo} preview={false} />
      </div>
      <div className="name " style={{ color: thme.token.colorText }}>
        PT-Booking
      </div>
    </div>
  );
});

export default AppLogo;

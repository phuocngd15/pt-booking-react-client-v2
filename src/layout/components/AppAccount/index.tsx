import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAccountStyle } from './style';
import avatar from '@/assets/avatar.png';
import { removeStorage } from '@/utils/storage';

const AppAccount = () => {
  const { AccountDiv } = getAccountStyle();

  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
    },
  ];

  const memuChange: MenuProps['onClick'] = (_e) => {
    removeStorage('userInfo');
    navigate('/customer/home');
  };

  return (
    <AccountDiv className="cursor">
      <Dropdown
        menu={{
          items,
          onClick: memuChange,
        }}
        placement="bottom"
        arrow
      >
        <img src={avatar} className="wave" />
      </Dropdown>
    </AccountDiv>
  );
};

export default AppAccount;

import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAccountStyle } from './style';
import avatar from '@/assets/avatar.png';
import {getStorage, removeStorage} from '@/utils/storage';
import { useAppDispatch } from '@/store/hooks';
import { updateWhoIsUsing } from '@/store/modules/customer';
import {UseInfoType} from "@/api/auth";

const AppAccount = () => {
  const { AccountDiv } = getAccountStyle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = getStorage<UseInfoType>('userInfo');
  console.log("userInfo",userInfo)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
    },
    {
      key: '2',
      label: 'Profile',
    },
  ];

  const menuClickHandler: MenuProps['onClick'] = (_e) => {
    switch (_e.key) {
      case '1':
        removeStorage('userInfo');
        dispatch(updateWhoIsUsing(undefined));
        navigate('/customer/home');
        break;
      case '2':
        // removeStorage('userInfo');
        // dispatch(updateWhoIsUsing(undefined));
        navigate('/profile');
        break;
      default:
        return;
    }
  };

  return (
    <AccountDiv className="cursor">
      <Dropdown
        menu={{
          items,
          onClick: menuClickHandler,
        }}
        placement="bottom"
        arrow
      >
        <img src={userInfo?.profile?.avatar} className="wave" />
      </Dropdown>
    </AccountDiv>
  );
};

export default AppAccount;

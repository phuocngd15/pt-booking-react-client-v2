import React from 'react';
import { Layout, theme, Menu } from 'antd';
import type { MenuProps } from 'antd';
import './index.less';
import { useNavigate } from 'react-router-dom';
import AppMain from './components/Main';

const { Footer } = Layout;
const items: MenuProps['items'] = [
  {
    label: 'SERVICES',
    key: '/customer/service',
  },
  {
    label: 'TRAINERS',
    key: '/customer/trainers',
  },
  {
    label: 'BOOKING',
    key: '/customer/booking',
  },
];

const LayoutCus: React.FC = () => {
  const navigate = useNavigate();
  const thme = theme.useToken();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.keyPath.toString());
  };
  const render = () => {
    return (
      <Layout className="layout" style={{ color: thme.token.colorText }}>
        <Layout>
          <Menu
            className="customMenu"
            theme={'light'}
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            items={items}
            onClick={onClick}
          />
          <AppMain />
          {/*<Footer style={{ textAlign: 'center', padding: 14 }}>*/}
          {/*  © 2023 Phuoc Nguyen Duy. All rights reserved*/}
          {/*</Footer>*/}
        </Layout>
      </Layout>
    );
  };
  return render();
};

export default LayoutCus;

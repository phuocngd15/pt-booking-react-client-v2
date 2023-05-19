import React from 'react';
import { Layout } from 'antd';
import './index.less';
import AppMain from './components/Main';
import MainNav from '@/layoutCus/components/MainNav';
import CustomerLayoutFooter from '@/layoutCus/components/Footer';

const { Footer } = Layout;

const LayoutCus: React.FC = () => {
  const render = () => {
    return (
      <div>
        <MainNav />
        <AppMain />
        <Footer style={{ textAlign: 'center' }}>
          <CustomerLayoutFooter />
        </Footer>
      </div>
    );
  };
  return render();
};

export default LayoutCus;

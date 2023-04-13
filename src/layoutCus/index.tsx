import React from 'react';
import { Layout } from 'antd';
import './index.less';
import AppMain from './components/Main';
import MainNav from '@/layoutCus/components/MainNav';

const { Footer } = Layout;



const LayoutCus: React.FC = () => {
  const render = () => {
    return (
      <div>
        <MainNav />
        <AppMain />
        {/*<Footer style={{ textAlign: 'center', padding: 14 }}>*/}
        {/*  © 2023 Phuoc Nguyen Duy. All rights reserved*/}
        {/*</Footer>*/}
      </div>
    );
  };
  return render();
};

export default LayoutCus;

import { Layout } from 'antd';
import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { getAppMainStyle } from './style';
import { KeepAlive } from '@/layout/components/AppMain/KeepAlive';
// import TabsPage from './TabsPage';
import LayoutSpin from '@/components/LayoutSpin';

const { Content } = Layout;

const Main = memo(() => {
  const isKeepAlive = false;
  const maxLen = 10;
  return (
    <Content>
      {/*<TabsPage maxLen={maxLen} />*/}
      <div className="main-content">
        {isKeepAlive ? (
          <KeepAlive maxLen={maxLen} />
        ) : (
          <Suspense fallback={<LayoutSpin />}>
            <Outlet />
          </Suspense>
        )}
      </div>
    </Content>
  );
});

export default Main;

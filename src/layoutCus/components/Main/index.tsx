import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { KeepAlive } from '@/layout/components/AppMain/KeepAlive';
import LayoutSpin from '@/components/LayoutSpin';
import TabsPage from '@/layout/components/AppMain/TabsPage';

const Main = memo(() => {
  const isKeepAlive = false;
  const maxLen = 10;
  return (
    <div>
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
    </div>
  );
});

export default Main;

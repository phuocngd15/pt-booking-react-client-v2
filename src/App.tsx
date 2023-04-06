import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import 'antd/dist/reset.css';
import { IntlProvider } from 'react-intl';
import { Suspense, useEffect, useMemo } from 'react';

import { shallowEqual } from 'react-redux';
import { localeConfig, setIntl } from './locales';
import Pages from './Pages';
import { useAppSelector } from './store/hooks';
import { getStorage } from './utils/storage';
import type { UseInfoType } from './server/useInfo';
import { initAsyncRoute } from './router/utils';
import LayoutSpin from './components/LayoutSpin';

function App() {
  const { locale, color, themeMode } = useAppSelector(
    (state) => ({
      locale: state.app.locale,
      color: state.app.color,
      themeMode: state.app.themeMode,
    }),
    shallowEqual,
  );
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const userInfo = getStorage<UseInfoType>('userInfo');

  const getLocale = useMemo(() => {
    setIntl(locale);
    if (locale === 'en-US') {
      dayjs.locale('en');
      return enUS;
    } else {
      dayjs.locale('zh-cn');
      return zhCN;
    }
  }, [locale]);

  useEffect(() => {
    if (!asyncRouter.length && userInfo) {
      initAsyncRoute(userInfo);
    }
  }, []);

  const loading = useMemo(() => {
    if (!asyncRouter.length && userInfo) {
      return true;
    }
    return false;
  }, [asyncRouter]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color || '#409eff',
        },
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      locale={getLocale}
    >
      <IntlProvider locale={locale} messages={localeConfig[locale]}>
        {loading ? (
          <LayoutSpin />
        ) : (
          // <BrowserRouter>
          <Suspense fallback={<LayoutSpin />}>
            <Pages />
          </Suspense>
          // </BrowserRouter>
        )}
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;

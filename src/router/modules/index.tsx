import {
  AppstoreOutlined,
  DatabaseOutlined,
  HomeOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteList } from '@/router/route';
import { FormattedMessage } from '@/locales';

const Home = lazy(() => import('@/views/Home'));
const CusManagement = lazy(() => import('@/views/CusManagement'));
// after login have routes
const defaultRoute: RouteList[] = [
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
    meta: { label: FormattedMessage({ id: 'layout.memu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: '/cus-management',
    id: 'CusManagement',
    element: <CusManagement />,
    meta: { label: FormattedMessage({ id: 'layout.memu.CusManagement' }) },
  },
];

export default defaultRoute;

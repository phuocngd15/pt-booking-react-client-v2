import {
  AppstoreOutlined,
  DatabaseOutlined,
  HomeOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteList } from '@/router/route';
import { FormattedMessage } from '@/locales';
import TicketsManagement from '@/views/TicketsManagement';
import ServicesManagement from '@/views/ServicesManagement';
import TimeSlotManagement from '@/views/TimeSlotManagement';

const Home = lazy(() => import('@/views/Home'));
const CusCalendar = lazy(() => import('@/viewsLoggedInCustomer/Calendar'));
const AdminCalendar = lazy(() => import('@/viewsSuperAdmin/Calendar'));
const CusManagement = lazy(() => import('@/views/CusManagement'));
const PTManagement = lazy(() => import('@/views/PTManagement'));
const AccountsManagement = lazy(() => import('@/viewsSuperAdmin/AccountsManagement'));
// after login have routes
const defaultRoute: RouteList[] = [
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
    meta: { label: FormattedMessage({ id: 'layout.memu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: '/calendar',
    id: 'CusCalendar',
    element: <CusCalendar />,
    meta: { label: 'Calendar', icon: <HomeOutlined /> },
  },
  {
    path: '/calendar',
    id: 'AdminCalendar',
    element: <AdminCalendar />,
    meta: { label: 'AdminCalendar', icon: <HomeOutlined /> },
  },
  {
    path: '/accounts-management',
    id: 'AccountsManagement',
    element: <AccountsManagement />,
    meta: { label: 'Accounts' },
  },
  {
    path: '/cus-management',
    id: 'CusManagement',
    element: <CusManagement />,
    meta: { label: FormattedMessage({ id: 'layout.memu.CusManagement' }) },
  },
  {
    path: '/pt-management',
    id: 'PTManagement',
    element: <PTManagement />,
    meta: { label: FormattedMessage({ id: 'layout.memu.ptmanagement' }) },
  },
  {
    path: '/tickets-management',
    id: 'TicketsManagement',
    element: <TicketsManagement />,
    meta: {
      label: FormattedMessage({ id: 'layout.memu.ticketsmanagement' }),
    },
  },
  {
    path: '/classRooms-management',
    id: 'ClassRoomsManagemen',
    element: <ServicesManagement />,
    meta: {
      label: FormattedMessage({ id: 'layout.memu.ClassRoomsManagemen' }),
    },
  },
  {
    path: '/timeSlot-management',
    id: 'TimeSlot ',
    element: <TimeSlotManagement />,
    meta: {
      label: FormattedMessage({ id: 'layout.memu.TimeSlotManagemen' }),
    },
  },
];

export default defaultRoute;

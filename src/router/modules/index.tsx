import { HomeOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteList } from '@/router/route';
import { FormattedMessage } from '@/locales';
import TicketsManagement from '@/views/TicketsManagement';
import ServicesManagement from '@/views/ServicesManagement';
import TimeSlotManagement from '@/views/TimeSlotManagement';
import WorkoutCounter from '@/views/DetectPuspup';

const Home = lazy(() => import('@/views/Home'));
const CusManagement = lazy(() => import('@/views/CusManagement'));
const PTManagement = lazy(() => import('@/views/PTManagement'));
const ProfilesView = lazy(() => import('@/views/Profile'));

const LoggedInCustomerHome = lazy(() => import('@/viewsLoggedInCustomer/Home'));
const CusCalendar = lazy(() => import('@/viewsLoggedInCustomer/Calendar'));

const TrainerCalendar = lazy(() => import('@/viewsTrainer/Calendar'));
const MyCustomer = lazy(() => import('@/viewsTrainer/MyCustomer'));

const AdminCalendar = lazy(() => import('@/viewsSuperAdmin/Calendar'));
const AccountsManagement = lazy(() => import('@/viewsSuperAdmin/AccountsManagement'));

const BookingsView = lazy(() => import('@/viewsCustomer/Bookings'));

// after login have routes
const defaultRoute: RouteList[] = [
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
    meta: { label: FormattedMessage({ id: 'layout.memu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: '/loggedCusHome',
    id: 'loggedCusHome',
    element: <LoggedInCustomerHome />,
    meta: { label: FormattedMessage({ id: 'layout.memu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: '/squatCounter',
    id: 'SquatCounter',
    element: <WorkoutCounter />,
    meta: { label: 'Squat Counter', hideSidebar: true },
  },
  {
    path: '/calendar',
    id: 'CusCalendar',
    element: <CusCalendar />,
    meta: { label: 'Calendar', icon: <CalendarOutlined /> },
  },
  {
    path: '/calendar',
    id: 'AdminCalendar',
    element: <AdminCalendar />,
    meta: { label: 'AdminCalendar', icon: <HomeOutlined /> },
  },
  {
    path: '/calendar',
    id: 'TrainerCalendar',
    element: <TrainerCalendar />,
    meta: { label: 'Calendar', icon: <HomeOutlined /> },
  },
  {
    path: '/myCustomer',
    id: 'MyCustomer',
    element: <MyCustomer />,
    meta: { label: 'Calendar', icon: <HomeOutlined /> },
  },
  {
    path: '/profile',
    id: 'Profile',
    element: <ProfilesView />,
    meta: { label: 'Profile' },
  },
  {
    path: '/booking',
    id: 'BookingsView',
    element: <BookingsView />,
    meta: { label: 'Booking', icon: <BookOutlined /> },
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

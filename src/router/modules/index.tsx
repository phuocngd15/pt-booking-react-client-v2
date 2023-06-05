import { HomeOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteList } from '@/router/route';
import { FormattedMessage } from '@/locales';
import WorkoutCounter from '@/views/DetectPuspup';
import ProgramsManagement from '@/viewsSuperAdmin/ProgramsManagement';
import BookingStepByStep from '@/viewsLoggedInCustomer/BookingStepByStep';
import BookingProgram from '@/viewsSuperAdmin/BookingProgram';

const Home = lazy(() => import('@/views/Home'));
const CusManagement = lazy(() => import('@/viewsSuperAdmin/CustomerManagement'));
const PTManagement = lazy(() => import('@/viewsSuperAdmin/TrainerManagement'));
const ProfilesView = lazy(() => import('@/views/Profile'));

const LoggedInCustomerHome = lazy(() => import('@/viewsLoggedInCustomer/Home'));
const CusCalendar = lazy(() => import('@/viewsLoggedInCustomer/Calendar'));

const TrainerCalendar = lazy(() => import('@/viewsTrainer/Calendar'));
const MyCustomer = lazy(() => import('@/viewsTrainer/MyCustomer'));

const AccountsManagement = lazy(() => import('@/viewsSuperAdmin/AccountsManagement'));
const TicketManagement = lazy(() => import('@/viewsSuperAdmin/TicketManagement'));

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
  // {
  //   path: '/calendar',
  //   id: 'AdminCalendar',
  //   element: <AdminCalendar />,
  //   meta: { label: 'AdminCalendar', icon: <CalendarOutlined /> },
  // },
  {
    path: '/calendar',
    id: 'TrainerCalendar',
    element: <TrainerCalendar />,
    meta: { label: 'My Calendar', icon: <CalendarOutlined /> },
  },
  {
    path: '/myCustomer',
    id: 'MyCustomer',
    element: <MyCustomer />,
    meta: { label: 'My Customer' },
  },
  {
    path: '/profile',
    id: 'Profile',
    element: <ProfilesView />,
    meta: { label: 'Profile', hideSidebar: true },
  },
  {
    path: '/booking',
    id: 'BookingsView',
    element: <BookingStepByStep />,
    meta: { label: 'Booking', icon: <BookOutlined /> },
  },
  {
    path: '/adBooking',
    id: 'adBookingsView',
    element: <BookingProgram />,
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
    element: <TicketManagement />,
    meta: {
      label: FormattedMessage({ id: 'layout.memu.ticketsmanagement' }),
    },
  },
  {
    path: '/classRooms-management',
    id: 'ClassRoomsManagemen',
    //  element: <ServicesManagement />,
    element: <ProgramsManagement />,
    meta: {
      label: 'Programs',
    },
  },
  // {
  //   path: '/timeSlot-management',
  //   id: 'TimeSlot ',
  //   element: <TimeSlotManagement />,
  //   meta: {
  //     label: FormattedMessage({ id: 'layout.memu.TimeSlotManagemen' }),
  //   },
  // },
];

export default defaultRoute;

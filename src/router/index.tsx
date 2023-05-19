import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout';
import LayoutCus from '@/layoutCus';
import Authority from '@/layout/Authority';
import ChangePwdForm from '@/views/Login/ChangePwdForm';
import HealthCheck from '@/viewsCustomer/HealthCheck';
import ToolBMI from '@/viewsCustomer/HealthCheck/BMI';
import DetectPose from '@/views/DetectPuspup';

const ErrorPage403 = lazy(() => import('@/views/core/error/403'));
const ErrorElement = lazy(() => import('@/views/core/error/ErrorElement'));
const Home = lazy(() => import('@/viewsCustomer/Home'));
const ServicesView = lazy(() => import('@/viewsCustomer/Services'));
const TrainersView = lazy(() => import('@/viewsCustomer/Trainers'));
const BookingsView = lazy(() => import('@/viewsCustomer/Bookings'));
const TicketSearchingPage = lazy(() => import('@/viewsCustomer/Bookings/TicketSearchingPage'));
const Login = lazy(() => import('@/views/Login'));
const SignUpForm = lazy(() => import('@/views/Login/SignUpForm'));
const RecoverPwdForm = lazy(() => import('@/views/Login/RecoverPwdForm'));

export const errorPage = [
  {
    path: '*',
    element: <ErrorPage403 />,
  },
];

export interface serviceType {
  key: string;
  name: string;
  description?: string;
}

export const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: (
      <Authority>
        <Layout />
      </Authority>
    ),
    errorElement: <ErrorElement pageType="Layout" />,
    children: [...errorPage],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <SignUpForm />,
  },
  {
    path: '/recover-pass',
    element: <RecoverPwdForm />,
  },
  {
    path: '/reset-password',
    element: <ChangePwdForm />,
  },
  {
    path: '/customer',
    element: <LayoutCus />,
    children: [
      {
        path: '/customer/home',
        element: <Home />,
      },
      {
        path: '/customer/service',
        element: <ServicesView />,
      },
      {
        path: '/customer/trainers',
        element: <TrainersView />,
      },
      {
        path: '/customer/booking',
        element: <BookingsView />,
      },
      {
        path: '/customer/ticketSearching',
        element: <TicketSearchingPage />,
      },
      {
        path: '/customer/healthCheck',
        element: <HealthCheck />,
      },
      {
        path: '/customer/DetectPose',
        element: <DetectPose />,
      },
      {
        path: '*',
        element: <ErrorPage403 />,
      },
    ],
    errorElement: <ErrorElement pageType="Layout" />,
  },
];

export default createBrowserRouter(baseRouter);

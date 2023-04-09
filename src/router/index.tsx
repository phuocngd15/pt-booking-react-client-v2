import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout';
import LayoutCus from '@/layoutCus';
import Authority from '@/layout/Authority';

const ErrorPage403 = lazy(() => import('@/views/core/error/403'));
const ErrorElement = lazy(() => import('@/views/core/error/ErrorElement'));
const Home = lazy(() => import('@/views/CustomerViews/Home'));
const ServicesView = lazy(() => import('@/views/CustomerViews/Services'));
const TrainersView = lazy(() => import('@/views/CustomerViews/Trainers'));
const BookingsView = lazy(() => import('@/views/CustomerViews/Bookings'));
const Login = lazy(() => import('@/views/Login'));

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
        // children: [
        //   {
        //     path: 'trainers/:groupName',
        //     element: <GroupTrainers />,
        //     loader: loadTrainersByGroup,
        //   },
        // ],
      },
      {
        path: '/customer/booking',
        element: <BookingsView />,
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



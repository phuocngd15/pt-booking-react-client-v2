import { deffHttp } from '@/utils/axios';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
import { rootServer } from '@/api/rootServer';

export const getTickets = (user?: string) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any[]>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/tickets/${userInfo?.email}`,
      data: { username: user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const getTicketsStatistics = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any[]>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/ticketsStatistics`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const getCusTickets = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any[]>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/tickets/cus/${userInfo?.profile._id}`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const getTrainerTickets = (cusId?: string) => {
  const userInfo = getStorage<UseInfoType>('userInfo');

  return deffHttp.get<any[]>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/tickets/trainer/${userInfo?.profile._id}`,
      data: { cusId: cusId },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const getAllTickets = (user?: string) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/tickets/`,
      data: { username: user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const confirmTicket = (id: string) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.post<any>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/ticket/${id}/confirm`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const cancelTicket = (id: string) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.post<any>(
    {
      // url: '/mock_api/login',
      url: `${rootServer}/api/sessions/ticket/${id}/cancel`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const getAllSessionAvailableOfTrainerByDate = (day: any, id: any) => {
  console.log('getAllSessionAvailableOfTrainerByDate');
  return deffHttp.post<any[]>(
    {
      url: `${rootServer}/api/sessions/available`,
      data: { trainerId: id, date: day },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

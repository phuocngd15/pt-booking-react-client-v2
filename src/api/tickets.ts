import { deffHttp } from '@/utils/axios';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
const userInfo = getStorage<UseInfoType>('userInfo');
export const getTickets = (user?: string) =>
  deffHttp.get<any[]>(
    {
      // url: '/mock_api/login',
      url: `http://localhost:3000/api/sessions/tickets/${userInfo?.email}`,
      data: { username: user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
export const getAllTickets = (user?: string) =>
  deffHttp.get<any>(
    {
      // url: '/mock_api/login',
      url: `http://localhost:3000/api/sessions/tickets/`,
      data: { username: user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

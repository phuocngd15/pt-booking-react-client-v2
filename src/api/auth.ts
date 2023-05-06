import { deffHttp } from '@/utils/axios';

export interface UseInfoType {
  name: string;
  userid: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  power: string;
}

export const getUserInfo = (user: string, pwd: string) =>
  deffHttp.post<UseInfoType>(
    {
      // url: '/mock_api/login',
      url: 'http://localhost:3000/api/auth/login',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

export const createUser = (user: string, pwd: string) =>
  deffHttp.post<any>(
    {
      //url: '/mock_api/register',
      url: 'http://localhost:3000/api/auth/register',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

export const rqForgetPass = (user: string, pwd: string) =>
  deffHttp.post<any>(
    {
      //url: '/mock_api/register',
      url: 'http://localhost:3000/api/auth/resetpass',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

export const resetpass = (pwd: string, token: string | null) =>
  deffHttp.post<any>(
    {
      //url: '/mock_api/register',
      url: `http://localhost:3000/api/auth/reset-password/${token}`,
      data: { password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

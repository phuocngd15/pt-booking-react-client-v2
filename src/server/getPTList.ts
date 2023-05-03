import { deffHttp } from '@/utils/axios';

export interface PT {
  key: string;
  name: string;
  userid: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  power: string;
}

export const getPts = () =>
  deffHttp.get<any>(
    {
      url: '/mock_api/getTrainers',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
export const getDetailPt = () =>
  deffHttp.get<any>(
    {
      url: '/mock_api/getTrainers/detail',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

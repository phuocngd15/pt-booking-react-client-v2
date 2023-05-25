//http://localhost:3000/api/users/profile/secoder79@gmail.com

import { deffHttp } from '@/utils/axios';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
import { rootServer } from '@/api/rootServer';
const userInfo = getStorage<UseInfoType>('userInfo');
// export interface Account {
//     username: string;
//     power: string;
//     key: string;
// }
export const getProfile = (email: string) =>
  deffHttp.get<any>(
    {
      url: `${rootServer}/api/users/profile/${email}`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export const updateProfile = (user: any, id: string, role: string) => {
  let url;
  if (role === 'trainer') {
    url = `${rootServer}/api/trainers/profile/${id}`;
  }
  if (role === 'customer') {
    url = `${rootServer}/api/users/profile/${id}`;
  }
  return deffHttp.put<any>(
    {
      url: url,
      data: { ...user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};
export const getCustomers = () =>
  deffHttp.get<any>(
    {
      url: `${rootServer}/api/users/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

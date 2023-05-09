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

export const updateProfile = (user: any,id:string) =>
  deffHttp.put<any>(
    {
      url: `${rootServer}/api/users/profile/${id}`,
      data: { ...user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

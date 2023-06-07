import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';

export const getAllGymCenters = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any>(
    {
      url: `${rootServer}/api/gymCenters/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};
export const addNewGymCenter = (params: object) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.post<any>(
    {
      url: `${rootServer}/api/gymCenters/new`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const updateGymCenter = (id: string, params: object) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.put<any>(
    {
      url: `${rootServer}/api/gymCenters/${id}`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

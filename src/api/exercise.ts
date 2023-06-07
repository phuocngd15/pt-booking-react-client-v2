import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';

export const getAllExercise = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any>(
    {
      url: `${rootServer}/api/activities/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};
export const addNewExercise = (params: object) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.post<any>(
    {
      url: `${rootServer}/api/activities/new`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};
//
export const updateExercise = (id: string, params: object) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.put<any>(
    {
      url: `${rootServer}/api/activities/${id}`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

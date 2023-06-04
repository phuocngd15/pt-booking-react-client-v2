import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';

export const getTrainers = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<any>(
    {
      url: `${rootServer}/api/trainers/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const addNewTrainer = (trainer: object) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.post<any>(
    {
      url: `${rootServer}/api/trainers/new`,
      data: { ...trainer },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const updateTrainerProfile = (id: string, trainer: object) => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.put<any>(
    {
      url: `${rootServer}/api/trainers/profile/${id}`,
      data: { ...trainer },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

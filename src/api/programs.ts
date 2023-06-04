import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';
const userInfo = getStorage<UseInfoType>('userInfo');

export interface Programs {
  key?: string;
  serviceName: string;
  avatar?: string;
  duration?: string;
  description: string;
  price: string;

  uuid: string;
  _id: string;
  createdAt: Date;
  canBookBefore?: number;
  serviceType: string[];
  state?: string;
  responsibleEmployees?: any[];
}

export const getPrograms = () =>
  deffHttp.get<Programs[]>(
    {
      url: `${rootServer}/api/programs/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export const addNewProgram = (params: object) =>
  deffHttp.post<Programs[]>(
    {
      url: `${rootServer}/api/programs/new`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export const getTrainerByServiceId = (uuid: string) => {
  return deffHttp.get<ITrainer[]>(
    {
      url: `${rootServer}/api/programs/${uuid}/trainers`,
      data: { uuid: uuid },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

export const updatePrograms = (id: string, params: object) => {
  return deffHttp.put<any>(
    {
      url: `${rootServer}/api/programs/${id}`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const updateMultiplePropPrograms = (id: string, payload: any) => {
  return deffHttp.put<any>(
    {
      url: `${rootServer}/api/programs/${id}`,
      data: payload,
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

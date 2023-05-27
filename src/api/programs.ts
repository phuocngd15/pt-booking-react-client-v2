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
// hang chuan, folder server la si da
export const getPrograms = () =>
  deffHttp.get<Programs[]>(
    {
      url: `${rootServer}/api/programs/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
export const getTrainerByServiceId = (uuid: string) => {
  console.log('getTrainerByServiceId', uuid);
  return deffHttp.get<ITrainer[]>(
    {
      url: `${rootServer}/api/programs/${uuid}/trainers`,
      data: { uuid: uuid },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};
export const updatePrograms = (id: string, payload: { newValue: any; keyProperty: string }) => {
  const newObj = {
    [payload.keyProperty]: payload.newValue,
  };
  return deffHttp.put<any>(
    {
      url: `${rootServer}/api/programs/${id}`,
      data: { ...newObj },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

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

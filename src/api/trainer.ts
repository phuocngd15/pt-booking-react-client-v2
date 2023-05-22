import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
const userInfo = getStorage<UseInfoType>('userInfo');
export const getTrainers = () =>
  deffHttp.get<any>(
    {
      url: `${rootServer}/api/trainers/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

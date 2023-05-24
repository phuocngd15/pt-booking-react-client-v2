import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
const userInfo = getStorage<UseInfoType>('userInfo');
export const getActivities = () =>
  deffHttp.get<any>(
    {
      url: `${rootServer}/api/activities/myActivities/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export const completeActivity = (id, times, reps) =>
  deffHttp.put<any>(
    {
      url: `${rootServer}/api/activities/complete/${'646e33e6d12b6837bfac9f62'}`,
      data: { completedReps: reps, reps },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

import { deffHttp } from '@/utils/axios';
import { rootServer } from '@/api/rootServer';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
const userInfo = getStorage<UseInfoType>('userInfo');
export interface IActivity {
  createByTrainer: string;
  createdAt: string;
  des: string;
  duration: string;
  level: string;
  name: string;
  reps: string;
  sets: string;
  user: string;
  _id: string;
}
export const getActivitiesUnComplete = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<IActivity[]>(
    {
      url: `${rootServer}/api/activitiesTasks/user/${userInfo?.profile?._id}/state/1`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};

export const completeActivity = (id, times, reps) =>
  deffHttp.put<any>(
    {
      url: `${rootServer}/api/activitiesTasks/${id}`,
      data: { completedReps: reps, duration: times, completeAt: Date.now(), state: '2' },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export const assignNewExercise = (params: object) =>
  deffHttp.post<any>(
    {
      url: `${rootServer}/api/activitiesTasks/new`,
      data: { ...params },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

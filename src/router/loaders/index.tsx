import { getServiceTypes, getTrainerDetail } from '@/server/trainersAPI';
import { getUserInfo, UseInfoType } from '@/api/auth';
import { initAsyncRoute } from '@/router/utils';
import { setStorage } from '@/utils/storage';

export async function loadServiceTypes() {
  const serviceTypes = await getServiceTypes();
  console.log('callApi serviceTypes', serviceTypes);
  return { serviceTypes };
}

export async function loadTrainersByGroup({ params }: any) {
  console.log('callApi loadTrainersByGroup ', params);
  // const trainers = await getTrainerDetail(params.groupName);
  // console.log('call api get Detail trainer by id or name ', trainers);

  const res = await getTrainerDetail(params.groupName);
  if (res.code === 1) {
    // await initAsyncRoute(res.data);
    // setStorage<UseInfoType>('userInfo', res.data);
    // navigate('/home');
    return { trainers: res.data };
  }

  return {};
}

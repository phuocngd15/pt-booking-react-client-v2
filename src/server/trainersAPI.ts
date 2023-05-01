import { deffHttp } from '@/utils/axios';
export interface Trainer {
  key: string;
  personId: string;
  fullName: string;
  phone: string;
  birthDay: number;
  address: string;
  email: string;
  rate: number;
  certificate?: string[];
  skills?: string[];
}

interface serviceType {
  key: string;
  name: string;
  description?: string;
}

export const getTrainers = () =>
  deffHttp.get<Trainer[]>(
    {
      url: '/mock_api/getTrainers/',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
export const getServiceTypes = () =>
  deffHttp.get<serviceType[]>(
    {
      url: '/mock_api/getServiceTypes/',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
export const getTrainerDetail = (groupName: string) => {
  console.log('getTrainerDetailgroupName', groupName);
  return deffHttp.post<Trainer[]>(
    {
      // url: '/mock_api/getTrainers/',
      url: 'http://localhost:3000/api/trainers/groups',
      data: { groupName: groupName, username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

export const getTrainerByServiceId = (serviceId: string) => {
  console.log('getTrainerDetailgroupName', serviceId);
  return deffHttp.post<Trainer[]>(
    {
      // url: '/mock_api/getTrainers/',
      url: 'http://localhost:3000/api/trainers/serviceId',
      data: { serviceId: serviceId },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

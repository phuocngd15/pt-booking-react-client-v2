import axios from 'axios';
import { deffHttp } from '@/utils/axios';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';
export type serviceState = 'active' | 'pending' | 'planing';

// export interface ServicePrototype {
//   duration: string;
//   serviceName: string;
//   staffs?: [];
//   canBookBefore?: boolean;
//   serviceType?: string[];
//   state?: serviceState;
// }

export interface ServicePrototype {
  serviceName: string;
  avatar?: string;
  duration?: string;
  description: string;
  price: string;

  uuid: string;

  createdAt: Date;
  canBookBefore?: number;
  serviceType: string[];
  state?: string;
  responsibleEmployees?: string[];
}
export const getTrainerByServiceId = (uuid: string) => {
  console.log('getTrainerByServiceId', uuid);
  return deffHttp.post<ITrainer[]>(
    {
      // url: '/mock_api/getTrainers/',
      url: 'http://localhost:3000/api/services/serviceId',
      data: { uuid: uuid },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

export const getAllPrograms = () => {
  console.log('getAllPrograms');
  return deffHttp.get<ServicePrototype[]>(
    {
      // url: '/mock_api/getTrainers/',
      url: 'http://localhost:3000/api/services/',
      data: {},
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

// uncategorized
export const getAllSessionAvailableOfTrainerByDate = (day: any, uuid:any) => {
  console.log('getAllPrograms');
  const trainerId = 'trainer_64354f32311bbe50dc9340c7';
  const date = '2022-12-01T08:00:00.000+00:00';
  axios
    .get(`http://localhost:3000/api/sessions/trainers/${trainerId}/availability/${date}`)
    .then((response) => {
      console.log('response.data', response.data);
    })
    .catch((error) => {
      console.log('error', error);
    });
  // return deffHttp.get<any[]>(
  //     {
  //       // url: '/mock_api/getTrainers/',
  //       url: 'http://localhost:3000/api/services/',
  //       data: {},
  //     },
  //     { errorMessageMode: 'modal', withToken: false },
  // );
};

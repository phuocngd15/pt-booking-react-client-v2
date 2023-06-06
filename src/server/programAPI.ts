import axios from 'axios';
import { deffHttp } from '@/utils/axios';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';
import { rootServer } from '@/api/rootServer';
export type serviceState = 'active' | 'pending' | 'planing';


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
  responsibleEmployees?: any[];
}
// export const getTrainerByServiceId = (uuid: string) => {
//   console.log('getTrainerByServiceId', uuid);
//   return deffHttp.get<ITrainer[]>(
//     {
//       url: `${rootServer}/api/programs/${uuid}/trainers`,
//       data: { uuid: uuid },
//     },
//     { errorMessageMode: 'modal', withToken: false },
//   );
// };

export const getAllPrograms = () => {
  return deffHttp.get<ServicePrototype[]>(
    {
      url: 'http://localhost:3000/api/programs/',
      data: {},
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

// uncategorized

export const bookingSession = (params: any) => {
  return deffHttp.post<any>(
    {
      url: 'http://localhost:3000/api/sessions/booking',
      data: { ...params },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

export const getDetailTicketBooking = (ticketCode: string) => {
  return deffHttp.get<any>(
    {
      url: `http://localhost:3000/api/sessions/tickets/${ticketCode}`,
      data: {},
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

export const getTicketsByState = (email, state) => {
  return deffHttp.get<any>(
    {
      url: `http://localhost:3000/api/sessions/tickets/cus/${email}/${state}`,
      data: {},
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

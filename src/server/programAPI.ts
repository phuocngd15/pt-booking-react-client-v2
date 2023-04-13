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
      url: 'http://localhost:3000/api/services/',
      data: {},
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

// uncategorized
export const getAllSessionAvailableOfTrainerByDate = (day: any, uuid: any) => {
  console.log('getAllSessionAvailableOfTrainerByDate');
  return deffHttp.post<any[]>(
    {
      url: 'http://localhost:3000/api/sessions/available',
      data: { trainerId: uuid, date: day },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

export const bookingSession = (params: any) => {
  console.log('bookingSession');
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

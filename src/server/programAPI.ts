import { deffHttp } from '@/utils/axios';
export type serviceState = 'active' | 'pending' | 'planing';
export interface ServicePrototype {
  duration: string;
  serviceName: string;
  staffs?: [];
  canBookBefore?: boolean;
  serviceType?: string[];
  state?: serviceState;
}
export const getTrainerByServiceId = (serviceId: string) => {
  console.log('getTrainerByServiceId', serviceId);
  return deffHttp.post<ServicePrototype>(
    {
      // url: '/mock_api/getTrainers/',
      url: 'http://localhost:3000/api/services/serviceId',
      data: { serviceId: serviceId },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
};

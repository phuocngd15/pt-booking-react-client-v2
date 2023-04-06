import { deffHttp } from '@/utils/axios';

export interface ServiceItem {
  key: string;

  name: string;
  price: string;

  staffs: {
    name: string;
    staffId: string;
  }[];

  createDate: Date;
  isAvailable: boolean;
  commonInfo: {
    durationTime: Date; // 1 booking keo dai X phut
    preBookTime: Date; // co the book truoc X ngay;
    preCancelTime: Date; // co the book truoc X ngay;
  };
  description?: string;
}

export const getServiceItems = () =>
  deffHttp.get<ServiceItem[]>(
    {
      url: '/mock_api/getServices',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

export const addNewService = (formData: object) =>
  deffHttp.post<ServiceItem>(
    {
      url: '/mock_api/addNewService',
      data: formData,
    },
    { errorMessageMode: 'modal', withToken: false },
  );

export const getDetailServiceItem = () =>
  deffHttp.get<any>(
    {
      url: '/mock_api/getServices/detail',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

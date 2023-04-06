import { deffHttp } from '@/utils/axios';

export const getTimeSlots = () =>
  deffHttp.get<any>(
    {
      url: '/mock_api/getTimeSlots',
      data: { username: 'user', password: 'pwd' },
    },
    { errorMessageMode: 'modal', withToken: false },
  );

import { deffHttp } from '@/utils/axios';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/views/api/auth';
const userInfo = getStorage<UseInfoType>('userInfo');
export interface Account {
  username: string;
  power: string;
  key: string;
}
export const getAccounts = (user?: string, pwd?: string) =>
  deffHttp.get<Account[]>(
    {
      // url: '/mock_api/login',
      url: 'http://localhost:3000/api/accounts',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

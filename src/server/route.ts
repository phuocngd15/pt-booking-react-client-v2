import type { AsyncRouteType } from '@/store/modules/route';
import { deffHttp } from '@/utils/axios';

enum Api {
  MockROUTE_LIST = '/mock_api/getRoute',
  RealROUTE_LIST = 'http://localhost:3000/routers/getRouter',
}

interface Param {
  name: string;
}

export const getRouteApi = (data: Param, options: any) =>
  deffHttp.post<AsyncRouteType[]>(
    { url: Api.MockROUTE_LIST, data },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: options.token },
  );

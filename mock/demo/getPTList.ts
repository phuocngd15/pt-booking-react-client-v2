import type { MockMethod, Recordable } from 'vite-plugin-mock';

interface DataType {
  key: string;
  fullName: string;
  phone: string;
  cmnd: string;
  email: string;
  joindate: string;
  age: number;
  address: string;
  description?: string;
}
function genID(length: number) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
function generateData(count: number): DataType[] {
  const data: DataType[] = [];

  for (let i = 0; i < count; i++) {
    const fullName = `PT ${i + 1}`;
    const cmnd = `${Math.floor(Math.random() * 900000000) + 100000000}`;
    const phone = `${Math.floor(Math.random() * 900000000) + 100000000}`;
    const email = `pt${i + 1}@example.com`;
    const address = `Địa chỉ PT ${i + 1}`;
    const joindate = `${Math.floor(Math.random() * 10) + 2012}-01-01`;
    const age = Math.floor(Math.random() * 20) + 20;

    data.push({
      key: `${genID(13).toString()}`,
      fullName,
      cmnd,
      phone,
      email,
      address,
      joindate,
      age,
    });
  }

  return data;
}
export default [
  {
    url: '/mock_api/getPts/detail',
    timeout: 1000,
    method: 'get',
    response: ({ body }: { body: Recordable }) => {
      const { username, password } = body;
      console.log(username);
      console.log(password);
      return {
        data: generateData(1)[0],
        code: 1,
        message: 'ok',
      };
    },
  },
  {
    url: '/mock_api/getPts',
    timeout: 1000,
    method: 'get',
    response: () => {
      return generateData(100);
    },
  },
] as MockMethod[];

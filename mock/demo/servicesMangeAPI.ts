import type { MockMethod, Recordable } from 'vite-plugin-mock';

interface DataType {
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
function genID(length: number) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
function generateData(numberOfItems): DataType[] {
  const staffs = [
    { name: 'John Doe', staffId: '1' },
    { name: 'Jane Smith', staffId: '2' },
    { name: 'Bob Johnson', staffId: '3' },
  ];

  const commonInfo = {
    durationTime: new Date(0, 0, 0, 1, 0), // 1 hour
    preBookTime: new Date(0, 0, 7, 0, 0), // 7 day
    preCancelTime: new Date(0, 0, 1, 0, 0), // 1 day
  };

  const data: DataType[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    data.push({
      key: genID(5),
      name: `Service ${i}`,
      price: `$${i * 10}`,
      staffs: staffs,
      createDate: new Date(),
      isAvailable: !!Math.floor(Math.random() * 2),
      commonInfo: commonInfo,
      description: `This is service number ${i}.`,
    });
  }

  return data;
}
export default [
  {
    url: '/mock_api/getServices/detail',
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
    url: '/mock_api/getServices',
    timeout: 2000,
    method: 'get',
    response: () => {
      return generateData(100);
    },
  },

  {
    url: '/mock_api/addNewService',
    timeout: 2000,
    method: 'post',
    response: ({ body }: { body: Recordable }) => {
      return {
        data: body,
        code: 1,
        message: 'ok',
      };
    },
  },
] as MockMethod[];

import { Button } from 'antd';
import { initAsyncRoute } from '@/router/utils';

const UseList = () => {
  const setCount = async () => {
    initAsyncRoute('test');
  };
  return <Button onClick={setCount}>Thay đổi quyền hạn</Button>;
};

export default UseList;

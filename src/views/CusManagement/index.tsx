import { Button, Card, Spin } from 'antd';

import { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import CusList from './components/CusList';

import { getPts } from '@/server/getPTList';
const ExtraMenu = () => {
  return (
    <>
      <Button icon={<PlusOutlined />}>
        Thêm Khách Hàng Mới
      </Button>
    </>
  );
};

const CusManagement = () => {
  console.log('CusManagement');
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getPts();
      if (res.code === 1) {
        setData(res.data);
      }
    })();
    return () => {
      // cleanup logic here
    };
  }, []);

  const renderTable = () => {
    if (!data.length) return <Spin />;
    return <CusList dataSource={data} />;
  };
  return (
    <>
      <ExtraMenu />
      {renderTable()}
    </>
  );
};

export default CusManagement;

import { memo, useEffect, useState } from 'react';

import { Card, Spin } from 'antd';
import Table from './components/Table';

import { getPts } from '@/server/getPTList';

const TicketsManagement = memo(() => {
  console.log('TicketsManagement');
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
    return <Table dataSource={data} />;
  };
  return <Card title="Danh sách đặt lịch tập">{renderTable()}</Card>;
});

export default TicketsManagement;

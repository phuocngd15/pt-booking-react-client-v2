import { memo, useEffect, useState } from 'react';

import { Card, Spin } from 'antd';
import Table from './components/Table';

import { getPts } from '@/server/getPTList';
import { getTrainers } from '@/api/trainer';

const PTManagement = memo(() => {
  console.log('PTManagament');
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getTrainers();
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
  return (
    <div>
      <Card title={<div className="text-2xl">Trainers</div>}>{renderTable()}</Card>
    </div>
  );
});

export default PTManagement;

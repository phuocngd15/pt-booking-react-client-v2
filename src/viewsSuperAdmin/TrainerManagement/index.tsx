import { memo, useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import Table from './components/Table';
import { getTrainers } from '@/api/trainer';
import AddNewTrainer from '@/viewsSuperAdmin/TrainerManagement/components/AddNewTrainer';

const PTManagement = memo(() => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getTrainers();
      if (res.code === 1) {
        res.data.forEach((e: any, i: number) => (e['key'] = (i + 1).toString()));
        setData(res.data);
      }
    })();
    return () => {};
  }, []);

  const renderTable = () => {
    if (!data.length) return <Spin />;
    return (
      <Table
        refreshData={async () => {
          const res = await getTrainers();
          if (res.code === 1) {
            res.data.forEach((e: any, i: number) => (e['key'] = (i + 1).toString()));
            setData(res.data);
          }
        }}
        dataSource={data}
      />
    );
  };
  return (
    <div>
      <AddNewTrainer />
      <Card title={<div className="text-2xl">Trainers</div>}>{renderTable()}</Card>
    </div>
  );
});

export default PTManagement;

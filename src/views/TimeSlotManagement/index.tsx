import { memo, useEffect, useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Table from './components/Table';
import { getTimeSlots } from '@/server/getTimeSlots';
const ExtratMenu = () => {
  return (
    <>
      <Button>
        <PlusOutlined />
        Tạo khung giờ mới
      </Button>
    </>
  );
};
const TimeSlotManagement = memo(() => {
  console.log('TicketsManagement');
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getTimeSlots();
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
    <Card title="Quản lý khung giờ" extra={<ExtratMenu />}>
      {renderTable()}
    </Card>
  );
});

export default TimeSlotManagement;

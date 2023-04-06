import { memo, useEffect, useState } from 'react';

import { Button, Card, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Table from './components/Table';

import { getPts } from '@/server/getPTList';

const ExtratMenu = () => {
  return (
    <>
      <Button>
        <PlusOutlined />
        Tạo lớp học mới
      </Button>
      <Button> Tạo lớp</Button>
    </>
  );
};
const ClassRoomManagement = memo(() => {
  console.log('ClassRoomManagement');
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
  return (
    <Card title="Danh sách lớp" extra={<ExtratMenu />}>
      {renderTable()}
    </Card>
  );
});

export default ClassRoomManagement;

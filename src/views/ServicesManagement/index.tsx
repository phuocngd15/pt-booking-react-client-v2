import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { AddNewServiceForm } from './AddNewService';
import UIGrid from './components/PresentGrid';
import type { ServiceItem } from '@/server/serviceAPI';
import { getServiceItems } from '@/server/serviceAPI';

const ExtraMenu = () => {
  return <AddNewServiceForm />;
};

const ServicesManagement = () => {
  console.log('ServiceManagement');
  const [data, setData] = useState<ServiceItem[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getServiceItems();
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
    return (
      <>
        <ExtraMenu />
        <UIGrid dataSource={data} />
      </>
    );
    // return <CusList dataSource={data} />;
  };
  return <>{renderTable()}</>;
};

export default ServicesManagement;

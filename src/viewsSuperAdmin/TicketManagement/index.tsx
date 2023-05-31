import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import type { Programs } from '@/api/programs';
import { getPrograms } from '@/api/programs';
import { getAllTickets } from '@/api/tickets';
const { Column, ColumnGroup } = Table;

export default function TicketManagement() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getAllTickets();
      if (result.code) {
        console.log('tickets', result.data);
        result.data.forEach((e, i) => (e.key = (i + 1).toString()));
        setData(result.data);
      }
    })();
    return () => {};
  }, []);
  return (
    <div>
      <Table dataSource={data}>
        <Column title="" dataIndex="key" key="key" />
        <Column
          title="Program"
          dataIndex="programUUID"
          key="programUUID"
          render={(e) => {
            return <div>{e.serviceName}</div>;
          }}
        />
        <Column
          title="Traner"
          dataIndex="trainerUUID"
          key="trainerUUID"
          render={(e) => {
            return <div>{e.trainerUUID}</div>;
          }}
        />
        <Column
          title="Customer"
          dataIndex="customerUUID"
          key="customerUUID"
          render={(e) => {
            return <div>{e.fullName}</div>;
          }}
        />
        <Column
          title="State"
          dataIndex="serviceName"
          key="serviceName"
          render={(e) => {
            return <div>{e.serviceName}</div>;
          }}
        />
      </Table>
    </div>
  );
}

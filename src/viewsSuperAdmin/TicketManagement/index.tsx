import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { cancelTicket, confirmTicket, getAllTickets } from '@/api/tickets';

const { Column } = Table;

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

  const refreshData = () => {
    getAllTickets().then((result) => {
      if (result.code) {
        result.data.forEach((e, i) => (e.key = (i + 1).toString()));
        setData(result.data);
      }
    });
  };

  const handleConfirmTicket = async (id) => {
    confirmTicket(id).then(refreshData);
  };
  const handleVoidTicket = async (id) => {
    cancelTicket(id).then(refreshData);
  };

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
            return <div>{e.fullName}</div>;
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
          dataIndex="status"
          key="status"
          render={(e) => {
            switch (e) {
              case 1:
                return <div>Waiting Confirm</div>;
              case 2:
                return <div>Confirmed</div>;
              case 3:
                return <div>Done</div>;
              case 4:
                return <div>Cancelled</div>;
            }
            return <div>{e}</div>;
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(value: any, record: any) => (
            <Space size="middle">
              {record.status === 1 && (
                <Button onClick={() => handleConfirmTicket(record._id)}>Confirm Booking</Button>
              )}
              {record.status === 2 && (
                <>
                  <Popconfirm
                    title="Sure to Cancel?"
                    onConfirm={() => handleVoidTicket(record._id)}
                    okType={'danger'}
                  >
                    <Button>Cancel Ticket</Button>
                  </Popconfirm>
                </>
              )}
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

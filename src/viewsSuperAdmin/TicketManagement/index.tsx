import { Button, Card, Popconfirm, Select, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { cancelTicket, confirmTicket, getAllTickets } from '@/api/tickets';
const { Column } = Table;

export default function TicketManagement() {
  const [data, setData] = useState<any[]>([]);
  const [filterTicketState, setFilterTicketState] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await getAllTickets();
      if (result.code) {
        console.log('tickets', result.data);
        result.data.forEach((e: any, i: number) => (e['key'] = (i + 1).toString()));
        setData(result.data);
      }
    })();
    return () => {};
  }, []);

  const refreshData = () => {
    getAllTickets().then((result) => {
      if (result.code) {
        result.data.forEach((e: any, i: number) => (e['key'] = (i + 1).toString()));
        setData(result.data);
      }
    });
  };

  const handleConfirmTicket = async (id: any) => {
    confirmTicket(id).then(refreshData);
  };
  const handleVoidTicket = async (id: any) => {
    cancelTicket(id).then(refreshData);
  };
  const handleFilterTicketByState = (state: number) => {
    setFilterTicketState(state);
  };
  return (
    <div>
      <div className="space-y-3">
        <Card
          title={
            <div className="mt-2">
              <span className="text-2xl">Tickets</span>
              <label className="relative block">
                <span className="mr-1">Status</span>
                <Select
                  defaultValue={0}
                  style={{ width: 120 }}
                  onChange={handleFilterTicketByState}
                  options={[
                    { value: 0, label: 'Total' },
                    { value: 1, label: 'Waiting Confirm' },
                    { value: 2, label: 'Confirmed' },
                    { value: 3, label: 'Done' },
                    { value: 4, label: 'Cancelled' },
                  ]}
                />
              </label>
            </div>
          }
        >
          <Table
            dataSource={
              filterTicketState === 0 ? data : data.filter((e) => e.status === filterTicketState)
            }
          >
            <Column title="" dataIndex="key" key="key" />
            <Column
              title="Program"
              dataIndex="programUUID"
              key="programUUID"
              render={(e) => {
                return <div>{e?.serviceName}</div>;
              }}
            />
            <Column
              title="Traner"
              dataIndex="trainerUUID"
              key="trainerUUID"
              render={(e) => {
                return <div>{e?.fullName}</div>;
              }}
            />
            <Column
              title="Customer"
              dataIndex="customerUUID"
              key="customerUUID"
              render={(e) => {
                return <div>{e?.fullName}</div>;
              }}
            />
            <Column
              title="Customer"
              dataIndex="customerUUID"
              key="customerUUID"
              render={(e) => {
                return <div>{e?.phone}</div>;
              }}
            />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(e) => {
                switch (e) {
                  case 1:
                    return <Tag color="red">Waiting Confirm</Tag>;
                  case 2:
                    return <Tag color="blue">Confirmed</Tag>;
                  case 3:
                    return <Tag color="green">Done</Tag>;
                  case 4:
                    return <Tag color="purple">Cancelled</Tag>;
                }
              }}
            />
            <Column
              title="Action"
              key="action"
              render={(value: any, record: any) => (
                <Space size="middle">
                  {![2, 4].includes(record.status) && (
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
        </Card>
      </div>
    </div>
  );
}

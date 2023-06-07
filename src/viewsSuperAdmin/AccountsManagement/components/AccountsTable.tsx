import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Table } from 'antd';
import { CustomTable } from '@/components/TableAnt';
import type { Account } from '@/api/accounts';

export default function AccountsTable({ dataSource, onClickBlockCallback, onClickActiveCallback }) {
  const columns: ColumnsType<Account> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      filterSearch: true,
      filterMode: 'tree',
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ['descend'],
      children: [],
    },
    {
      title: 'Role',
      dataIndex: 'power',
      key: 'power',
      filterSearch: true,
      sorter: (a, b) => a.power.length - b.power.length,
      sortDirections: ['descend'],
      children: [],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filterSearch: true,
      children: [],
    },
    {
      title: '',
      dataIndex: '',
      key: 'fullName',
      render: (value, record, _index) => {
        return (
          <>
            <Button
              hidden={record.status !== 'active'}
              onClick={() => {
                onClickBlockCallback(record);
              }}
            >
              <a>Block</a>
            </Button>
            <Button
              hidden={record.status === 'active'}
              onClick={() => {
                onClickActiveCallback(record);
              }}
            >
              <a>Open</a>
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: 240 }}
      onChange={() => {}}
      expandable={{
        expandedRowRender: (record) => {
          console.log('record', record);
          return (
            <div className="space-y-2">
              <div>Name: {record?.profile?.fullName}</div>
              <div>Birthday: {record?.profile?.fullName}</div>
              <div>Introduction Time: {record?.profile?.introduction}</div>
              <div>Phone: {record?.profile?.phone}</div>
            </div>
          );
        },
        rowExpandable: (record) => record?.profile?.fullName,
      }}
    />
  );
}

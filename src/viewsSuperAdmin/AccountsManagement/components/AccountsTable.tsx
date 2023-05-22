import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { CustomTable } from '@/components/TableAnt';
import type { Account } from '@/api/accounts';
import {Button} from "antd";

export default function AccountsTable({ dataSource, onClickBlockCallback,onClickActiveCallback }) {
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
  return <CustomTable columns={columns} dataSource={dataSource} />;
}

import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { CustomTable } from '@/components/TableAnt';
import type { Account } from '@/views/api/accounts';

export default function AccountsTable({ dataSource, onCickDetailCallback }: any) {
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
      title: '',
      dataIndex: '',
      key: 'fullName',
      render: (value, record, _index) => {
        return (
          <div
            onClick={() => {
              onCickDetailCallback(record);
            }}
          >
            <a>Detail</a>
          </div>
        );
      },
    },
  ];
  return <CustomTable columns={columns} dataSource={dataSource} />;
}

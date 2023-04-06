import React from 'react';
import { Table } from 'antd';

export interface CustomTable {
  dataSource: any;
  columns: any;
}
export const CustomTable: React.FC<CustomTable> = ({ dataSource, columns }) => {
  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 240 }}
        onChange={() => {}}
      />
    </>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { Customer } from '@/api/user';
import { getMyCustomers } from '@/api/user';
import type { Programs } from '@/api/programs';
import { getPrograms, updatePrograms } from '@/api/programs';
import EditProgramType from '@/viewsSuperAdmin/ProgramsManagement/components/EditProgramType';
const { Column, ColumnGroup } = Table;

export default function ProgramsManagement() {
  const [data, setData] = useState<Programs[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getPrograms();
      if (result.code) {
        result.data.forEach((e, i) => (e.key = (i + 1).toString()));
        setData(result.data);
      }
    })();
    return () => {};
  }, []);

  return (
    <DataTable
      data={data}
      refreshData={() => {
        getPrograms().then((result) => {
          if (result.code) {
            setData(result.data);
          }
        });
      }}
    />
  );
}

function DataTable({ data, refreshData }) {
  console.log('programs data table', data);
  return (
    <Table dataSource={data} size="middle">
      <Column title="" dataIndex="key" key="key" />
      <Column title="Full Name" dataIndex="serviceName" key="serviceName" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="State" dataIndex="state" key="state" />
      <Column
        title="Type"
        dataIndex="serviceType"
        key="serviceType"
        render={(tags: string[]) => (
          <>
            {tags?.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: any) => (
          <Space size="middle">
            <a>Add workout activity</a>
            <EditProgramType
              keyProperty={'serviceType'}
              updateFunction={updatePrograms}
              data={record}
              refreshData={refreshData}
              _id={record._id}
              tags={record.serviceType}
            />
          </Space>
        )}
      />
    </Table>
  );
}

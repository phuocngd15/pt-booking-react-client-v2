import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { Programs } from '@/api/programs';
import { getPrograms, updateMultiplePropPrograms, updatePrograms } from '@/api/programs';
import EditProgramType from '@/viewsSuperAdmin/ProgramsManagement/components/EditProgramType';
import EditRowData from '@/viewsSuperAdmin/ProgramsManagement/components/EditRowData';
import EditResponsibleEmployees from '@/viewsSuperAdmin/ProgramsManagement/components/EditResponsibleEmployees';
import { AddNewServiceForm } from '@/views/ServicesManagement/AddNewService';
import CustomerSelector from '@/components/UserSelector/CustomerSelector';
import TrainerSelector from '@/components/UserSelector/TrainerSelector';

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
    <div>
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
    </div>
  );
}

function DataTable({ data, refreshData }) {
  console.log('programs data table', data);
  return (
    <Table dataSource={data} size="middle">
      <Column title="" dataIndex="key" key="key" />
      <Column title="Name" dataIndex="serviceName" key="serviceName" />
      <Column
        title="Image"
        dataIndex="avatar"
        key="avatar"
        render={(image) => <img className="truncate w-36 hover:text-clip" src={image} />}
      />
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="State" dataIndex="state" key="state" />
      <Column
        title="Employess"
        dataIndex="responsibleEmployees"
        key="responsibleEmployees"
        render={(e: any[]) => {
          return <div>{e.map((i) => i.profile.fullName).join(',')}</div>;
        }}
      />
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
        render={(value: any, record: any) => (
          <Space size="middle">
            <EditRowData
              title={'Edit Program'}
              _id={record._id}
              data={value}
              updateFunction={updateMultiplePropPrograms}
              refreshData={refreshData}
            />
            <EditProgramType
              title="Edit Type Program"
              keyProperty={'serviceType'}
              updateFunction={updatePrograms}
              data={record.serviceType}
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

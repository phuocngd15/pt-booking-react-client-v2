import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { Programs } from '@/api/programs';
import { getPrograms } from '@/api/programs';
import AddProgram from '@/viewsSuperAdmin/ProgramsManagement/components/AddProgram';
import EditProgram from '@/viewsSuperAdmin/ProgramsManagement/components/EditProgram';

const { Column } = Table;

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
      <AddProgram />
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
      <Column title="Level" dataIndex="programLevel" key="programLevel" />
      <Column title="Status" dataIndex="status" key="status" />
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
        dataIndex="category"
        key="category"
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
            <EditProgram id={record._id} objectData={value} callBack={refreshData} />
            {/*<EditRowData*/}
            {/*  title={'Edit Program'}*/}
            {/*  _id={record._id}*/}
            {/*  data={value}*/}
            {/*  updateFunction={updateMultiplePropPrograms}*/}
            {/*  refreshData={refreshData}*/}
            {/*/>*/}
            {/*<EditProgramType*/}
            {/*  title="Edit Type Program"*/}
            {/*  keyProperty={'category'}*/}
            {/*  updateFunction={updatePrograms}*/}
            {/*  data={record.category}*/}
            {/*  refreshData={refreshData}*/}
            {/*  _id={record._id}*/}
            {/*  tags={record.category}*/}
            {/*/>*/}
          </Space>
        )}
      />
    </Table>
  );
}

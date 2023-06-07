import { Space, Table } from 'antd';
import useGymCenters from '@/hooks/useGymCenters';
import AddGymCenter from '@/viewsSuperAdmin/GymCenterManagement/components/AddGymCenter';
import EditGymCenter from '@/viewsSuperAdmin/GymCenterManagement/components/EditGymCenter';

const { Column } = Table;

export default function GymCenterManagement() {
  const [gymCenters, getGymCenters] = useGymCenters({ isDefaultGet: true });

  return (
    <div>
      <AddGymCenter />
      <DataTable data={gymCenters} refreshData={getGymCenters} />
    </div>
  );
}

function DataTable({ data, refreshData }: { data: any; refreshData: any }) {
  console.log('programs data table', data);
  return (
    <Table
      dataSource={data}
      size="middle"
      expandable={{
        expandedRowRender: (record) => {
          return (
            <div className="space-y-2">
              <div>Address: {record.centerAddressStr}</div>
              <div>Description: {record.centerDes}</div>
              <div>Operating Time: {record.centerOperatingDes}</div>
            </div>
          );
        },
        rowExpandable: (record) => record.name !== '',
      }}
    >
      <Column title="" dataIndex="key" key="key" />
      <Column title="Name" dataIndex="centerName" key="centerName" />
      <Column title="LocationCode" dataIndex="centerAddressProvince" key="centerAddressProvince" />
      {/*<Column title="LocationCode" dataIndex="centerImageMain" key="centerImageMain" />*/}
      <Column
        title="Main Image"
        dataIndex="centerImageMain"
        key="centerImageMain"
        render={(image) => (
          <img className="truncate w-36 hover:text-clip" src={image} alt="image-gym-center" />
        )}
      />

      <Column
        title="Google Map Info"
        key="GGContent"
        render={(value: any, record: any) =>
          record.centerName !== 'Online' && (
            <>
              <div>{record.centerGGContent}</div>
              <div>{record.centerGGLabelMaker}</div>
              <div>lat: {record.centerGGLocation.lat}</div>
              <div>lng: {record.centerGGLocation.lng}</div>
            </>
          )
        }
      />
      <Column
        title="Action"
        key="action"
        render={(value: any, record: any) =>
          record.centerName !== 'Online' && (
            <Space size="middle">
              <EditGymCenter id={record._id} objectData={value} callBack={refreshData} />
            </Space>
          )
        }
      />
    </Table>
  );
}

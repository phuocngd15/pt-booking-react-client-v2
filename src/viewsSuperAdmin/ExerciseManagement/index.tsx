import { Space, Table } from 'antd';
import useGymCenters from '@/hooks/useGymCenters';
import AddGymCenter from '@/viewsSuperAdmin/GymCenterManagement/components/AddGymCenter';
import EditGymCenter from '@/viewsSuperAdmin/GymCenterManagement/components/EditGymCenter';
import AddExercise from '@/viewsSuperAdmin/ExerciseManagement/components/AddExercise';
import EditExercise from '@/viewsSuperAdmin/ExerciseManagement/components/EditExercise';
import useExercise from '@/hooks/useExercise';

const { Column } = Table;

export default function ExerciseManagement() {
  const [exercises, getExercises] = useExercise({ isDefaultGet: true });
  console.log('exercises data', exercises);
  return (
    <div>
      <AddExercise />
      <DataTable data={exercises} refreshData={getExercises} />
    </div>
  );
}

function DataTable({ data, refreshData }: { data: any; refreshData: any }) {
  return (
    <Table
      dataSource={data}
      size="middle"
      // expandable={{
      //   expandedRowRender: (record) => {
      //     return (
      //       <div className="space-y-2">
      //         <div>Address: {record.centerAddressStr}</div>
      //         <div>Description: {record.centerDes}</div>
      //         <div>Operating Time: {record.centerOperatingDes}</div>
      //       </div>
      //     );
      //   },
      //   rowExpandable: (record) => record.name !== '',
      // }}
    >
      <Column title="" dataIndex="key" key="key" />
      <Column title="Exercise Name" dataIndex="activityName" key="activityName" />
      <Column
        title="Image Demo"
        dataIndex="imageDemo"
        key="imageDemo"
        render={(image) => (
          <img className="truncate w-36 hover:text-clip" src={image} alt="image-gym-center" />
        )}
      />
      <Column title="Level" dataIndex="activityLevel" key="activityLevel" />
      <Column title="Sets" dataIndex="activitySets" key="activitySets" />
      <Column title="Reps" dataIndex="activityReps" key="activityReps" />
      <Column title="Description" dataIndex="activityDes" key="activityDes" />
      <Column
        title="Action"
        key="action"
        render={(value: any, record: any) =>
          record.centerName !== 'Online' && (
            <Space size="middle">
              <EditExercise id={record._id} objectData={value} callBack={refreshData} />
            </Space>
          )
        }
      />
    </Table>
  );
}

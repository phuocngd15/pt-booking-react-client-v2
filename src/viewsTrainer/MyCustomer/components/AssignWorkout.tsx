import React, {useEffect, useState} from 'react';
import { Select } from 'antd';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import { addNewGymCenter } from '@/api/gymCenter';
import DateSelection from '@/viewsCustomer/Bookings/components/DateSelection';
import { getAllSessionAvailableOfTrainerByDate } from '@/api/tickets';
import useExercise from '@/hooks/useExercise';
import {assignNewExercise} from "@/api/dailyActivitiesTask";
import {getStorage} from "@/utils/storage";
import {UseInfoType} from "@/api/auth";
//https://thanhthinhbui.com/zipcode/

// const paramField ={
//   name: string;
//   des: string;
//   reps: number;
//   sets: number;
//   level?: string;
//   createdAt?: Date;
//   completeAt?: Date;
//   duration?: string;
//   completedReps?: string;
//   user: IUser['_id'];
//   createByTrainer: ITrainer['_id'];
//   imageDemo?: string;
//   state: string;
// }
// createdAt?: Date;
// completeAt?: Date;
// duration?: string;
// completedReps?: string;
// user: IUser['_id'];
// createByTrainer: ITrainer['_id'];
// activityInfo: IActivity['_id'];
// state: string;
export default function AssignWorkout({ customerId }) {
  const [formData, setFormData] = useState<any>();
  const userInfo = getStorage<UseInfoType>('userInfo');
  //console.log("userInfo",userInfo)

  //call API
  const handleAddProgram = async () => {
    //console.log('formData', formData);
    const params = {
      activityInfo: formData?.activityId,
      deadlineDay: formData?.deadlineDay,
      createByTrainer: userInfo?.profile._id,
      user: customerId,
    };
    console.log("params",params)
    assignNewExercise(params).then((result) => {
      console.log('result', result);
    });
  };

  const onDataFormChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };
  return (
    <CustomBtnModal
      customForm={<FormAddNewProgram onDataFormChange={onDataFormChange} />}
      nameBtn={'Add new GymCenter'}
      onOkCallBack={handleAddProgram}
      width={500}
    />
  );
}

// form add new program
function FormAddNewProgram({ onDataFormChange }: { onDataFormChange: Function }) {
  const handleChangeDataForm = (newdata: object) => {
    onDataFormChange(newdata);
  };

  return (
    <div>
      <div className="text-2xl mb-2">Assign exercises to Customer</div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">Select Exercise</span>
            <SelectExercise handleChangeDataForm={handleChangeDataForm} />
          </label>
        </div>
        <div>
          <label className="relative block">
            <div className="">Dead line</div>
            <DateSelection
              onSelectCallback={(e: any) => {
                handleChangeDataForm({ deadlineDay: e.utc() });
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function SelectExercise({ handleChangeDataForm }: { handleChangeDataForm: Function }) {
  const [exercises] = useExercise({ isDefaultGet: true });
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    mappingOption();
  }, [exercises]);
  const mappingOption = () => {
    const newoptions: any[] = [];
    exercises?.forEach((e) => {
      newoptions.push({ value: e._id, label: e.activityName });
    });
    setOptions(newoptions);
  };
  return (
    <Select
      placeholder="Exercise"
      style={{ width: 450 }}
      onChange={(e) => {
        handleChangeDataForm({ activityId: e });
      }}
      options={options}
    />
  );
}

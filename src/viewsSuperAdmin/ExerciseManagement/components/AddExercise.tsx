import React, { useState } from 'react';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import { addNewExercise } from '@/api/exercise';
//https://thanhthinhbui.com/zipcode/
export default function AddExercise() {
  const [formData, setFormData] = useState<any>();

  //call API
  const handleAddProgram = async () => {
    const params = {
      activityName: formData?.activityName,
      activityDes: formData?.activityDes,
      activitySets: Number(formData?.activitySets),
      activityReps: Number(formData?.activityReps),
      imageDemo: formData?.imageDemo,
    };
    addNewExercise(params).then((result) => {
      console.log('result', result);
    });
  };

  const onDataFormChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };
  return (
    <CustomBtnModal
      customForm={<FormAddNewProgram onDataFormChange={onDataFormChange} />}
      nameBtn={'Add New Exercise'}
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
      <div className="text-2xl mb-2">New Exercise Information</div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">Exercise Name</span>
            <input
              id="activityName"
              name="activityName"
              type="text"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name"
              onChange={(e) => handleChangeDataForm({ activityName: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Exercise Description</span>
            <textarea
              id="activityDes"
              name="activityDes"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Decription"
              onChange={(e) => handleChangeDataForm({ activityDes: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="relative block">
            <span className="">Sets</span>
            <input
              id="activitySets"
              name="activitySets"
              autoComplete="text"
              type="number"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="1"
              onChange={(e) => handleChangeDataForm({ activitySets: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Reps</span>
            <input
              id="activityReps"
              name="activityReps"
              autoComplete="text"
              type="number"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="1"
              onChange={(e) => handleChangeDataForm({ activityReps: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Image demo</span>
            <input
              id="centerImageMain"
              name="centerImageMain"
              autoComplete="text"
              type="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="URL image"
              onChange={(e) => handleChangeDataForm({ imageDemo: e.target.value })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

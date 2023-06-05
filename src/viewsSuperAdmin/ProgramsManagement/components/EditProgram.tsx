import React, { useState } from 'react';
import { Select } from 'antd';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import TrainerSelector from '@/components/UserSelector/TrainerSelector';
import { updatePrograms } from '@/api/programs';
export default function EditProgram({
  id,
  objectData,
  callBack,
}: {
  id: string;
  objectData: object;
  callBack: Function;
}) {
  const [formData, setFormData] = useState<any>();

  //call API
  const handleAddProgram = async () => {
    console.log('formData', formData);
    const params = {
      serviceName: formData?.className,
      avatar: formData.imageLink,
      duration: 1,
      description: '',
      programLevel: formData.programLevel,
      price: '700000',
      canBookBefore: 7,
      category: formData?.types,
      teachingStyle: formData.teachingStyle,
      status: formData?.status,
      responsibleEmployees: formData?.employees,
    };
    updatePrograms(id, params).then((result) => {
      console.log('result', result);
      callBack();
    });
  };
  //update local state
  const onDataFormChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };
  return (
    <CustomBtnModal
      customForm={<FormAddNewProgram onDataFormChange={onDataFormChange} initData={objectData} />}
      nameBtn={'Edit program'}
      onOkCallBack={handleAddProgram}
      width={500}
    />
  );
}

// form add new program
function FormAddNewProgram({
  onDataFormChange,
  initData,
}: {
  onDataFormChange: Function;
  initData: any;
}) {
  const handleChangeDataForm = (newdata: object) => {
    onDataFormChange(newdata);
  };
  console.log('initData', initData);
  return (
    <div>
      <div className="text-2xl mb-2">Edit Program Information</div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">Class Name</span>
            <input
              id="class-name"
              name="classname"
              type="text"
              autoComplete="text"
              required
              defaultValue={initData?.serviceName}
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => handleChangeDataForm({ className: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Image link</span>
            <input
              id="image-link"
              name="imagelink"
              type="text"
              autoComplete="text"
              required
              defaultValue={initData?.avatar}
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => handleChangeDataForm({ imageLink: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Level</span>
            <Select
              style={{ width: 450 }}
              defaultValue={initData?.programLevel}
              onChange={(e) => handleChangeDataForm({ programLevel: e })}
              options={[
                { value: 'Basic', label: 'Basic' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced ' },
              ]}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="mr-2">Status</span>
            <Select
              style={{ width: 450 }}
              defaultValue={initData?.status}
              onChange={(e) => handleChangeDataForm({ status: e })}
              placeholder="Status"
              options={[
                { value: 'Private', label: 'Private' },
                { value: 'Public', label: 'Public' },
              ]}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Type</span>
            <Select
              placeholder={'Type'}
              mode="multiple"
              defaultValue={initData?.category}
              style={{ width: 450 }}
              onChange={(e) => {
                handleChangeDataForm({ types: e });
              }}
              options={[
                { value: 'Yoga', label: 'Yoga' },
                { value: 'Functional', label: 'Functional' },
                { value: 'Strength', label: 'Strength' },
              ]}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Teach Style</span>
            <Select
              placeholder="Teacthing Style"
              mode="multiple"
              defaultValue={initData?.teachingStyle}
              style={{ width: 450 }}
              onChange={(e) => {
                handleChangeDataForm({ teachingStyle: e });
              }}
              options={[
                { value: 'Online-1-1', label: 'Online-1-1' },
                { value: 'Online-1-N', label: 'Online-1-N' },
                { value: 'Offline-1-1', label: 'Offline-1-1' },
                { value: 'Offline-1-N', label: 'Offline-1-N' },
              ]}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <TrainerSelector
              defaultValue={() => {
                const options: any[] = [];
                initData?.responsibleEmployees.forEach((e: any) => {
                  if (e.power === 'trainer') {
                    options.push({
                      value: e._id,
                      label: e?.profile?.fullName,
                    });
                  }
                });
                return options;
              }}
              isMulti={true}
              width={450}
              onChangeOption={(e: any) => handleChangeDataForm({ employees: e })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

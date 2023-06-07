import { Select } from 'antd';
import React, { useState } from 'react';
import { updateTrainerProfile } from '@/api/trainer';
import { CustomBtnModal } from '@/components/CustomBtnModal';
export default function EditTrainer({ id, objectData, callBack }: any) {
  const [formData, setFormData] = useState<any>();

  //call API
  const handleAdd = async () => {
    console.log('formData', formData);

    updateTrainerProfile(id, formData).then((result) => {
      console.log('result', result);
      callBack();
    });
  };
  //update local state
  const onDataFormChange = (data: any) => {
    console.log('data', data);
    setFormData({ ...formData, ...data });
  };
  return (
    <CustomBtnModal
      customForm={<ProfileTrainer onDataFormChange={onDataFormChange} initData={objectData} />}
      nameBtn={'Edit profile'}
      onOkCallBack={handleAdd}
      width={500}
    />
  );
}
function ProfileTrainer({
  onDataFormChange,
  initData,
}: {
  onDataFormChange: Function;
  initData: any;
}) {
  console.log('initData', initData);
  const handleChangeDataForm = (newdata: object) => {
    onDataFormChange(newdata);
  };
  return (
    <div>
      <div className="text-2xl mb-2">Edit Profile Trainer</div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">Account</span>
            <input
              id="full-name"
              name="fullname"
              type="text"
              autoComplete="text"
              required
              defaultValue={initData?.fullName}
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="FullName"
              onChange={(e) => handleChangeDataForm({ fullName: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">FullName</span>
            <input
              id="full-name"
              name="fullname"
              type="text"
              autoComplete="text"
              required
              defaultValue={initData?.fullName}
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="FullName"
              onChange={(e) => handleChangeDataForm({ fullName: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Gender</span>
            <Select
              placeholder={'Gender'}
              style={{ width: 450 }}
              onChange={(e) => {
                handleChangeDataForm({ gender: e });
              }}
              defaultValue={initData?.gender}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Phone</span>
            <input
              id="image-link"
              name="phone"
              type="number"
              defaultValue={initData?.phone}
              autoComplete="number"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Phone"
              onChange={(e) => handleChangeDataForm({ phone: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Email</span>
            <input
              id="image-link"
              name="email"
              type="email"
              defaultValue={initData?.email}
              autoComplete="email"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email"
              onChange={(e) => handleChangeDataForm({ email: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Avatar url</span>
            <input
              id="image-link"
              name="imagelink"
              type="text"
              autoComplete="text"
              defaultValue={initData?.avatar}
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Url"
              onChange={(e) => handleChangeDataForm({ avatarURl: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="relative block">
            <span className="">Skills</span>
            <Select
              placeholder={'Skilss'}
              mode="multiple"
              defaultValue={initData?.skills}
              style={{ width: 450 }}
              onChange={(e) => {
                handleChangeDataForm({ skills: e });
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
            <span className="">Year of Exp</span>
            <input
              id="image-link"
              name="imagelink"
              type="text"
              autoComplete="text"
              required
              defaultValue={initData?.yearExperience}
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="3"
              onChange={(e) => handleChangeDataForm({ yearExperience: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Certificates</span>
            <textarea
              id="certificates"
              name="certificates"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="MasterYoGa,"
              defaultValue={initData?.certificates.join(',')}
              onChange={(e) => {
                const cer = e.target.value.split(',');
                handleChangeDataForm({ certificates: cer });
              }}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Avatars</span>
            <textarea
              id="avatars"
              name="avatars"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="url"
              defaultValue={initData?.avatars.join(',')}
              onChange={(e) => {
                const cer = e.target.value.split(',');
                handleChangeDataForm({ avatars: cer });
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Select } from 'antd';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import { MultipleForm } from '@/components/MultipleForm';
import { addNewTrainer } from '@/api/trainer';

export default function AddNewTrainer() {
  const [formData, setFormData] = useState<any>({ power: 'trainer' });

  //call API
  const handleAdd = async () => {
    addNewTrainer(formData).then((result) => {
      console.log('result', result);
    });
  };
  //update local state
  const onDataFormChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };
  return (
    <CustomBtnModal
      customForm={<FormAddNewProgramContainer onDataChange={onDataFormChange} />}
      nameBtn={'Add new trainer'}
      onOkCallBack={handleAdd}
      width={700}
    />
  );
}

// form add new program
function ProfileTrainer({ onDataFormChange }: { onDataFormChange: Function }) {
  const handleChangeDataForm = (newdata: object) => {
    onDataFormChange(newdata);
  };
  return (
    <div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">FullName</span>
            <input
              id="full-name"
              name="fullname"
              type="text"
              autoComplete="text"
              required
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
              style={{ width: 500 }}
              onChange={(e) => {
                handleChangeDataForm({ gender: e });
              }}
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
              style={{ width: 500 }}
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

function NewAccount({ onDataFormChange }: { onDataFormChange: Function }) {
  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState: boolean) => !prevState);
  };
  const handleChangeDataForm = (newdata: object) => {
    onDataFormChange(newdata);
  };
  return (
    <div className="space-y-3 ">
      <div>
        <label className="relative block">
          <span className="sr-only">Email address</span>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Email address"
            onChange={(e: any) => handleChangeDataForm({ username: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label className="relative block">
          <span className="sr-only">Password</span>

          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Password"
            onChange={(e: any) => handleChangeDataForm({ password: e.target.value })}
          />
        </label>
      </div>
      <div className="flex items-center justify-between" onClick={togglePasswordVisibility}>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={() => {}}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Show password
          </label>
        </div>
      </div>
    </div>
  );
}

function FormAddNewProgramContainer({ onDataChange }: { onDataChange: Function }) {
  return (
    <div>
      <div className="text-2xl mb-2">New Trainer</div>
      <MultipleForm
        tabs={[
          {
            tabName: 'New Account',
            tabContent: <NewAccount onDataFormChange={onDataChange} />,
          },
          {
            tabName: 'Profile Trainer',
            tabContent: <ProfileTrainer onDataFormChange={onDataChange} />,
          },
        ]}
        tabPosition={'left'}
      />
    </div>
  );
}

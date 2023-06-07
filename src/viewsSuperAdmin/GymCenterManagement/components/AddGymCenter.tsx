import React, { useState } from 'react';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import { addNewGymCenter } from '@/api/gymCenter';
//https://thanhthinhbui.com/zipcode/
export default function AddGymCenter() {
  const [formData, setFormData] = useState<any>();

  //call API
  const handleAddProgram = async () => {
    const params = {
      centerName: formData?.centerName,
      centerAddressStr: formData?.centerAddressStr,
      centerDes: formData?.centerDes,
      centerGGContent: formData?.centerGGContent,
      centerGGLabelMaker: formData?.centerGGLabelMaker,
      centerGGLocation: {
        lat: formData?.centerGGLocationLat,
        lng: formData?.centerGGLocationLng,
      },
      centerImageMain: formData?.centerImageMain,
      centerImages: formData?.centerImages,
      centerOperatingDes: formData?.centerOperatingDes,
      centerAddressProvince: formData?.centerAddressProvince,
    };
    addNewGymCenter(params).then((result) => {
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
      <div className="text-2xl mb-2">New GymCenter Information</div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">Center Name</span>
            <input
              id="centerName"
              name="centerName"
              type="text"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name"
              onChange={(e) => handleChangeDataForm({ centerName: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Center Description</span>
            <textarea
              id="centerDes"
              name="centerDes"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Decription"
              onChange={(e) => handleChangeDataForm({ centerDes: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Operation time</span>
            <input
              id="centerOperatingDes"
              name="centerOperatingDes"
              autoComplete="text"
              type="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="5am - 7pm"
              onChange={(e) => handleChangeDataForm({ centerOperatingDes: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="relative block">
            <span className="">Center Address</span>
            <textarea
              id="centerAddressStr"
              name="centerAddressStr"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Address"
              onChange={(e) => handleChangeDataForm({ centerAddressStr: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Center Main Image</span>
            <input
              id="centerImageMain"
              name="centerImageMain"
              autoComplete="text"
              type="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="URL image"
              onChange={(e) => handleChangeDataForm({ centerImageMain: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span className="">Google Information</span>
            <div className="space-y-2">
              <input
                id="centerGGLocationLat"
                name="centerGGLocationLat"
                autoComplete="text"
                type="text"
                required
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Latitude"
                onChange={(e) => handleChangeDataForm({ centerGGLocationLat: e.target.value })}
              />
              <input
                id="centerGGLocationLng"
                name="centerGGLocationLng"
                autoComplete="text"
                type="text"
                required
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Longtitude"
                onChange={(e) => handleChangeDataForm({ centerGGLocationLng: e.target.value })}
              />
              <input
                id="centerGGContent"
                name="centerGGContent"
                autoComplete="text"
                type="text"
                required
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Tooltip Content"
                onChange={(e) => handleChangeDataForm({ centerGGContent: e.target.value })}
              />
              <input
                id="centerGGLabelMaker"
                name="centerGGLabelMaker"
                autoComplete="text"
                type="text"
                required
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Label Maker"
                onChange={(e) => handleChangeDataForm({ centerGGLabelMaker: e.target.value })}
              />
            </div>
          </label>
        </div>
        <div>
          <label className="relative block">
            <span>Zip Postal Code</span>
            <input
              id="centerImageMain"
              name="centerImageMain"
              autoComplete="text"
              type="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Zip Postal Code"
              onChange={(e) => handleChangeDataForm({ centerAddressProvince: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span>Images</span>
            <input
              id="centerImageMain"
              name="centerImageMain"
              autoComplete="text"
              type="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="url1,url2,"
              onChange={(e) => {
                const imagesArray: string[] = [];
                const convert = e.target.value.split(',');
                imagesArray.push(...convert);
                handleChangeDataForm({ centerImages: imagesArray });
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

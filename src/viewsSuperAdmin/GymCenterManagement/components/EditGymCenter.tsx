import React, { useState } from 'react';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import { updateGymCenter } from '@/api/gymCenter';
//Zip code reference https://thanhthinhbui.com/zipcode/
export default function EditGymCenter({
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
  const handleEdit = async () => {
    console.log('formData', formData);
    const params = {
      centerName: formData?.centerName,
      centerAddressStr: formData?.centerAddressStr,
      centerDes: formData?.centerDes,
      centerGGContent: formData?.centerGGContent,
      centerGGLabelMaker: formData?.centerGGLabelMaker,
      centerGGLocation: formData?.centerGGLocation,
      centerImageMain: formData?.centerImageMain,
      centerImages: formData?.centerImages,
      centerOperatingDes: formData?.centerOperatingDes,
      centerAddressProvince: formData?.centerAddressProvince,
    };
    updateGymCenter(id, params).then(() => {
      callBack();
    });
  };

  const onDataFormChange = (data: any) => {
    console.log('onchange data', data);
    setFormData({ ...formData, ...data });
  };
  return (
    <CustomBtnModal
      customForm={<FormAddNewGymCenter onDataFormChange={onDataFormChange} initData={objectData} />}
      nameBtn={'Edit'}
      onOkCallBack={handleEdit}
      width={500}
    />
  );
}

// form add new program
function FormAddNewGymCenter({
  onDataFormChange,
  initData,
}: {
  onDataFormChange: Function;
  initData: any;
}) {
  const handleChangeDataForm = (newdata: object) => {
    onDataFormChange(newdata);
  };
  return (
    <div>
      <div className="text-2xl mb-2">New Program Information</div>
      <div className="space-y-3">
        <div>
          <label className="relative block">
            <span className="">Center Name</span>
            <input
              id="centerName"
              name="centerName"
              type="text"
              autoComplete="text"
              defaultValue={initData?.centerName}
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
              defaultValue={initData?.centerDes}
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
              defaultValue={initData?.centerOperatingDes}
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
              defaultValue={initData?.centerAddressStr}
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
              defaultValue={initData?.centerImageMain}
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
                defaultValue={Object.values(initData?.centerGGLocation)}
                onChange={(e) => {
                  const spits = e.target.value.split(',');
                  if (spits.length === 2) {
                    const newcenterGGLocation = {
                      lat: spits[0],
                      lng: spits[1],
                    };
                    handleChangeDataForm({ centerGGLocation: newcenterGGLocation });
                  }
                }}
              />
              <input
                id="centerGGContent"
                name="centerGGContent"
                autoComplete="text"
                type="text"
                required
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Tooltip Content"
                defaultValue={initData?.centerGGContent}
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
                defaultValue={initData?.centerGGLabelMaker}
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
              defaultValue={initData?.centerAddressProvince}
              onChange={(e) => handleChangeDataForm({ centerAddressProvince: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <span>Images</span>
            <textarea
              id="centerImageMain"
              name="centerImageMain"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="url1,url2,"
              defaultValue={initData?.centerImages?.join(',')}
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

import React from 'react';

export interface ServicesSelectionProps {
  uuid?: string | number;
  serviceUUID: string | number;
  title?: string;
  serviceType: string;
  description?: string;
  isSelected?: boolean;
  onCheckCallBack?: Function;
}
export interface serviceInfo {
  uuid?: string | number;
  serviceUUID: string | number;
  title?: string;
  serviceType?: string;
  description?: string;
  isSelected?: boolean;
  onCheckCallBack?: Function;
}
const ServicesSelection: React.FC<ServicesSelectionProps> = (props) => {
  const { title, description, onCheckCallBack, isSelected, uuid, serviceUUID, serviceType } = props;
  let newState = isSelected;
  const onCheck = () => {
    newState = !newState;
    if (onCheckCallBack) {
      const selectInfo: serviceInfo = {
        uuid,
        title,
        description,
        isSelected: newState,
        serviceUUID,
      };
      onCheckCallBack(selectInfo);
    }
  };
  const onChangeInput = () => {};
  return (
    <div className="hover:drop-shadow-xl cursor-pointer" onClick={() => onCheck()}>
      <div className=" p-2 bg-white border rounded-lg">
        <div className="flex md:justify-between">
          <div className="font-bold lg:text-xl">{title || 'Title Service'}</div>
          <input type="radio" checked={newState} onChange={onChangeInput} />
        </div>
        <div>Program: {serviceType}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default ServicesSelection;

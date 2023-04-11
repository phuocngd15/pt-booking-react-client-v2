import React from 'react';

export interface ServicesSelectionProps {
  serviceName: string;
  avatar?: string;
  duration?: string;
  description: string;
  price: string;

  uuid: string;

  createdAt: Date;
  canBookBefore?: number;
  serviceType: string[];
  state?: string;
  responsibleEmployees?: string[];
  isSelected?: boolean;
  onCheckCallBack?: Function;
}
export interface serviceInfo {
  serviceName: string;
  avatar?: string;
  duration?: string;
  description: string;
  price?: string;

  uuid: string;

  createdAt?: Date;
  canBookBefore?: number;
  serviceType?: string[];
  state?: string;
  responsibleEmployees?: string[];
  isSelected?: boolean;
  onCheckCallBack?: Function;
}
const ServicesSelection: React.FC<ServicesSelectionProps> = (props) => {
  const {
    serviceName,
    description,
    onCheckCallBack,
    isSelected,
    uuid,
    serviceType,
    canBookBefore,
    responsibleEmployees,
  } = props;
  let newState = isSelected;
  const onCheck = () => {
    newState = !newState;
    if (onCheckCallBack) {
      const selectInfo: serviceInfo = {
        uuid,
        serviceName,
        description,
        isSelected: newState,
        canBookBefore,
        responsibleEmployees,
      };
      onCheckCallBack(selectInfo);
    }
  };
  const onChangeInput = () => {};
  return (
    <div className="hover:drop-shadow-xl cursor-pointer" onClick={() => onCheck()}>
      <div className=" p-2 bg-white border rounded-lg">
        <div className="flex md:justify-between">
          <div className="font-bold lg:text-xl">{serviceName || 'Title Service'}</div>
          <input type="radio" checked={newState} onChange={onChangeInput} />
        </div>
        <div>Program: {serviceType}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default ServicesSelection;

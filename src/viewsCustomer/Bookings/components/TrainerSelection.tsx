import React, { useState } from 'react';
import { Select } from 'antd';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';

export interface TrainersSelectionProps {
  data: any;
  onSelect: (selectedTrainer: ITrainer | undefined) => void;
}

const TrainersSelection: React.FC<TrainersSelectionProps> = ({ data, onSelect }) => {
  const [selected, setSelected] = useState<string>();
  console.log('data', data);
  const onCheck = (trainerId: string) => {
    //const clickedItemInfo = data.find((item) => item.uuid === value);

    setSelected(trainerId);
    if (onSelect) {
      onSelect(trainerId);
    }
  };

  const onChangeInput = () => {};
  if (!data?.length)
    return (
      <div className="hover:drop-shadow-xl cursor-pointer m-2">
        <div className=" p-2 bg-white border rounded-lg">
          <div className="flex md:justify-between">
            <div className="font-bold lg:text-lg">System will assign.</div>
            <input type="radio" checked={true} readOnly={true} />
          </div>
        </div>
      </div>
    );
  return (
    // <Select
    //   className="w-full"
    //   onChange={handleSelect}
    //   defaultValue={{ value: 'anyone', label: 'Anyone', uuid: '' }}
    //   options={[{ value: '', label: 'Anyone', uuid: '' }, ...options]}
    // />
    <div className="h-80 overflow-y-auto">
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="hover:drop-shadow-xl cursor-pointer m-2"
            onClick={() => onCheck(item?.profile._id)}
          >
            <div className=" p-2 bg-white border rounded-lg">
              <div className="flex md:justify-between">
                <div className="font-bold lg:text-lg">
                  {item?.profile.fullName || 'Title Service'}
                </div>
                <input
                  type="radio"
                  checked={item?.profile._id === selected}
                  onChange={onChangeInput}
                />
              </div>
              <div className="lg:text-sm">
                Certificate: {item?.profile.certificates?.join(', ')}
              </div>
              <div className="lg:text-sm">{item?.profile.skills.join(', ')}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainersSelection;

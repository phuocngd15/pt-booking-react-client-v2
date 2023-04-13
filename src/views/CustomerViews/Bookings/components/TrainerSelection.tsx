import React, { useState } from 'react';
import { Select } from 'antd';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';

export interface TrainersSelectionProps {
  data: ITrainer[];
  onSelect: (selectedTrainer: ITrainer | undefined) => void;
}

const TrainersSelection: React.FC<TrainersSelectionProps> = ({ data, onSelect }) => {
  const [selected, setSelected] = useState<string>();
  // const handleSelect = (value: any, _: any) => {
  //   const selectedTrainer = availableTrainers.find((trainer) => trainer.uuid === value);
  //   onSelect(selectedTrainer);
  // };
  //
  //
  // if(!availableTrainers) return null
  // const options = availableTrainers.map((trainer) => ({
  //   value: trainer.uuid,
  //   label: trainer.fullName,
  //   ...trainer,
  // }));
  const onCheck = (value: string) => {
    const clickedItemInfo = data.find((item) => item.uuid === value);

    setSelected(value);
    if (onSelect) {
      onSelect(clickedItemInfo);
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
      {data?.map((item) => {
        return (
          <div
            key={item.uuid}
            className="hover:drop-shadow-xl cursor-pointer m-2"
            onClick={() => onCheck(item.uuid)}
          >
            <div className=" p-2 bg-white border rounded-lg">
              <div className="flex md:justify-between">
                <div className="font-bold lg:text-lg">{item.fullName || 'Title Service'}</div>
                <input type="radio" checked={item.uuid === selected} onChange={onChangeInput} />
              </div>
              <div className='lg:text-sm'>Certificate: {item.certificates.join(', ')}</div>
              <div className='lg:text-sm'>{item.skills.join(', ')}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainersSelection;

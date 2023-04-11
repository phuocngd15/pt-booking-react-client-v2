import React from 'react';
import { Select } from 'antd';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';

export interface TrainersSelectionProps {
  availableTrainers: ITrainer[];
  onSelect: (selectedTrainer: ITrainer | undefined) => void;
}

const TrainersSelection: React.FC<TrainersSelectionProps> = ({ availableTrainers, onSelect }) => {
  const handleSelect = (value: any, _: any) => {
    const selectedTrainer = availableTrainers.find((trainer) => trainer.uuid === value);
    onSelect(selectedTrainer);
  };

  const options = availableTrainers.map((trainer) => ({
    value: trainer.uuid,
    label: trainer.fullName,
    ...trainer,
  }));

  return <Select className="w-full" onChange={handleSelect} options={options} />;
};

export default TrainersSelection;

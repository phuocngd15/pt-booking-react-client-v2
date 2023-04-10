import React from 'react';
import { Select, Space } from 'antd';
export interface TrainersSelectionProps {}
export interface serviceInfo {}
const TrainersSelection: React.FC<TrainersSelectionProps> = (props) => {
  const handleChange = (optionValue: any) => {
    console.log(`selected ${optionValue}`, optionValue);
    //dispacth get khung thoi gian ranh
  };

  return (
    <Space wrap>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={(_, option) => handleChange(option)}
        options={[
          { value: 'jack', label: 'Jack', uuid: 'staffId_1' },
          { value: 'lucy', label: 'Lucy', uuid: 'staffId_2' },
          { value: 'Yiminghe', label: 'yiminghe', uuid: 'staffId_3' },
          { value: 'disabled', label: 'Disabled', disabled: true, uuid: 'staffId_4' },
        ]}
      />
    </Space>
  );
};

export default TrainersSelection;

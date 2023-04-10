import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
export interface TimeSelectionProps {}
export interface serviceInfo {}
const TimeSelection: React.FC<TimeSelectionProps> = (props) => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space wrap>
      <DatePicker onChange={onChange} />
    </Space>
  );
};

export default TimeSelection;

import React from 'react';
import { DatePicker, Calendar, Space, theme } from 'antd';
import type { DatePickerProps } from 'antd';
// import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface TimeSelectionProps {
  onSelectCallback?: Function;
}

const DateSelection: React.FC<TimeSelectionProps> = (props) => {
  const { token } = theme.useToken();
  const { onSelectCallback } = props;

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const maxDaysToSelect = 7;
    const today = dayjs().endOf('day');
    return current < today || current > today.add(maxDaysToSelect, 'day');
  };
  const onChange = (value: Dayjs) => {
    console.log(value.format('YYYY-MM-DD'));
    if (onSelectCallback) {
      onSelectCallback(value);
    }
  };
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  // const dateCellRender = (value) => {
  //   const date = dayjs.utc(value.format('dd')).format();
  //   // Your logic for rendering each date cell here
  //   return <div>{date}</div>;
  // };

  return (
    <Space wrap>
      <div style={wrapperStyle}>
        <Calendar
          defaultValue={dayjs().add(1, 'day')}
          fullscreen={false}
          onChange={onChange}
          disabledDate={disabledDate}
        />
      </div>
    </Space>
  );
};

export default DateSelection;

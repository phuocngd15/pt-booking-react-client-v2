import React from 'react';
import { DatePicker, Calendar, Space,theme } from 'antd';
import type { DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
export interface TimeSelectionProps {}

const DateSelection: React.FC<TimeSelectionProps> = (props) => {
  const { token } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const maxDaysToSelect = 7;
    const today = dayjs().endOf('day');
    return current < today || current > today.add(maxDaysToSelect, 'day');
  };
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <Space wrap>
      <div style={wrapperStyle}>
        <Calendar fullscreen={false} onPanelChange={onPanelChange} disabledDate={disabledDate} />
      </div>
    </Space>
  );
};

export default DateSelection;

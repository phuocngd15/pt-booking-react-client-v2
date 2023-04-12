import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { useState } from 'react';

import type { Dayjs } from 'dayjs';
import { joinClassNames } from '@/utils/classNamesStyle';

dayjs.extend(utc);
dayjs.extend(timezone);
interface TimeSelectionProps {
  availableSession: any[];
  onCheckCallBack?: Function;
}

const TimeSelection: React.FC<TimeSelectionProps> = (props) => {
  const { onCheckCallBack, availableSession } = props;
  const [selectedTime, setSelectedTime] = useState<Dayjs>();

  const onCheck = (e: Dayjs) => {
    if (onCheckCallBack) {
      onCheckCallBack(e);
    }
    setSelectedTime(e);
  };
  if (!availableSession) return null;
  return (
    <div className="w-56 h-80 overflow-y-auto">
      <div className='class="mt-2 grid grid-cols-2 gap-4 '>
        {availableSession.map((timeSlot) => {
          const isSame = timeSlot === selectedTime;
          return (
            <div
              className={joinClassNames(
                isSame ? 'bg-violet-600 text-white' : 'text-gray-400',
                'text-center p-1 bg-white border rounded-md',
              )}
              onClick={() => onCheck(timeSlot)}
            >
              {dayjs(timeSlot).tz('Asia/Ho_Chi_Minh').format('h:mm A')}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TimeSelection;

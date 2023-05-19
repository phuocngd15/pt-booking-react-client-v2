import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { memo, useEffect, useState } from 'react';

import type { Dayjs } from 'dayjs';
import { joinClassNames } from '@/utils/classNamesStyle';
import { baseRouter } from '@/router';

dayjs.extend(utc);
dayjs.extend(timezone);
interface TimeSelectionProps {
  availableSession: any[];
  onCheckCallBack?: Function;
}

const TimeSelection: React.FC<TimeSelectionProps> = memo((props) => {
  const { onCheckCallBack, availableSession } = props;
  const [selectedTime, setSelectedTime] = useState<Dayjs | undefined>();

  const onCheck = (e: Dayjs) => {
    if (selectedTime === e) {
      setSelectedTime(undefined);
    } else {
      setSelectedTime(e);
    }

    if (onCheckCallBack) {
      onCheckCallBack(e);
    }
  };

  if (!availableSession) return <div></div>;
  return (
    <div className="w-full h-80 overflow-y-auto">
      <div className='class="mt-2 grid grid-cols-2 gap-4 '>
        {availableSession.map((timeSlot) => {
          const isSame = timeSlot === selectedTime;
          return (
            <div
              key={timeSlot}
              className={joinClassNames(
                isSame ? 'font-bold' : 'text-gray-400',
                'text-center p-1 bg-white border rounded-md hover:drop-shadow-xl ',
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
});
export default TimeSelection;

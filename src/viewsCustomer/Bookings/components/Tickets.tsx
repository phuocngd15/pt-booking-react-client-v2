import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode.react';
dayjs.extend(utc);
dayjs.extend(timezone);

interface TicketType {
  ticketName?: string;
  startTime?: string;
  endTime?: string;
  trainerUUID?: string;
  customerUUID?: string;
  createdAt?: string;
  status?: string;
}

interface TicketsProps {
  data: {
    tickets: TicketType[];
    user: any;
  };
}

const Tickets: React.FC<TicketsProps> = (props) => {
  // const tickets = Array.isArray(props.data) ? props.data : [props.data];

  return (
    <div className="grid grid-cols-4 gap-2">
      {props.data?.tickets?.map((e) => {
        return <Ticket data={e} />;
      })}
    </div>
  );
};
interface TicketProps {
  ticketName?: string;
  startTime?: string;
  endTime?: string;
  trainerUUID?: string;
  customerUUID?: string;
  createdAt?: string;
  status?: string;
  programName?: string;
  trainerName?: string;
  customerName?: string;
}
export function Ticket({
  startTime,
  endTime,
  createdAt,
  status,
  trainerName,
  programName,
  customerName,
}: TicketProps) {
  const ticketRef = React.useRef();
  //const { startTime, endTime } = data ?? { startTime: '9:00 AM', endTime: '12:00 PM' };
  const handleDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.download = `${programName.trim().replace(' ', '')}.png`;
    link.href = imageUrl;
    link.click();
  };
  const handleExport = () => {
    toPng(ticketRef?.current)
      .then((dataUrl) => {
        handleDownload(dataUrl);
      })
      .catch((error) => {
        console.error('Unable to export image', error);
      });
  };

  return (
    <div className="relative w-auto h-auto">
      <button
        onClick={handleExport}
        className="p-4 w-5 h-5 absolute right-0 top-0 flex items-center justify-center shadow-lg rounded-lg"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </span>
      </button>
      <div
        ref={ticketRef}
        className="flex flex-col items-center border bg-white rounded-lg overflow-hidden shadow-lg p-7  "
      >
        <div className="text-xl font-semibold mb-4">{programName}</div>
        <div className="text-gray-500 mb-2 font-medium">
          {dayjs(startTime).tz('Asia/Ho_Chi_Minh').format('dddd DD-MM-YYYY')}
        </div>
        <div className="text-gray-500 mb-2">
          <span className="font-medium">Time: </span>
          {dayjs(startTime).tz('Asia/Ho_Chi_Minh').format('h:mm')}
          <span className="font-medium"> - </span>
          {dayjs(endTime).tz('Asia/Ho_Chi_Minh').format('h:mm A')}
        </div>
        <div className="text-gray-500">
          <span className="font-medium">Trainer: {trainerName}</span>
        </div>{' '}
        <div className="text-gray-500 mb-4">
          <span className="font-medium">Customer: {customerName}</span>
        </div>
        <QRCode
          value={JSON.stringify({
            startTime,
            endTime,
            createdAt,
            status,
            trainerName,
            programName,
            customerName,
          })}
        />
      </div>
    </div>
  );
}

export default Tickets;

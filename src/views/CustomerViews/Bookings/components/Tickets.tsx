import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
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
interface TicketProps {
  item: TicketType;
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
    <div>
      {props.data?.tickets?.map((e) => {
        return <Ticket item={e} />;
      })}
    </div>
  );
};

const Ticket: React.FC<TicketProps> = (props) => {
  const { startTime, endTime } = props.item;
  return (
    <div className="border bg-white rounded-lg overflow-hidden shadow-lg p-6">
      <div className=" text-xl font-semibold mb-4">Ticket UUID: 1234-5678-9101</div>
      <div className="text-gray-500 mb-2">
        <span className="font-medium">Day:</span>{' '}
        {dayjs(startTime).tz('Asia/Ho_Chi_Minh').format('dddd DD-MM-YYYY')}
      </div>
      <div className="text-gray-500 mb-2">
        <span className="font-medium">Time Start:</span>{' '}
        {dayjs(startTime).tz('Asia/Ho_Chi_Minh').format('h:mm A') || '9:00 AM'}
      </div>
      <div className="text-gray-500 mb-4">
        <span className="font-medium">Time End:</span>{' '}
        {dayjs(endTime).tz('Asia/Ho_Chi_Minh').format('h:mm A') || '12:00 PM'}
      </div>
      <div className="text-gray-500 mb-2">
        <span className="font-medium">Program: Yoga</span>
      </div>
      <div className="text-gray-500 mb-4">
        <span className="font-medium">Trainer:</span> John Doe
      </div>
      <div className="text-gray-500 mb-4">
        <span className="font-medium">Status:</span> Done
      </div>
    </div>
  );
};

export default Tickets;

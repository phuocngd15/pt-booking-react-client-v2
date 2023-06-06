import React, { useEffect, useState } from 'react';
import type { EventClickArg, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'antd';
import './calendar.css';
import { Ticket } from '@/viewsCustomer/Bookings/components/Tickets';
import { getCusTickets } from '@/api/tickets';
//https://fullcalendar.io/docs/react
//https://github.com/fullcalendar/fullcalendar-examples/blob/main/react-typescript/src/DemoApp.tsx
export default function CusCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg['event']>();
  const [isOpen, setIsOpen] = useState(false);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getCusTickets();
      if (res.code === 1) {
        console.log('feach data tickets', res);
        const events = res.data.map((e) => {
          return {
            id: e._id,
            title: e.programUUID.serviceName,
            start: e.startTime,
            extendedProps: { ...e },
          };
        });
        console.log('events after mapping', events);
        setBookedEvents(events);
      }
    })();
    return () => {
      // cleanup logic here
    };
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    console.log('clickInfo.event', clickInfo.event._def.extendedProps);
    setIsOpen(true); // open the dialog
  };

  return (
    <>
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'today prevYear,prev,next,nextYear',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            selectMirror={false}
            dayMaxEvents={true}
            weekends={true}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick} // open detail event
            events={bookedEvents}
            height="auto" // will activate stickyHeaderDates automatically!
          />
          <Modal
            title="TICKET INFOMATION"
            open={isOpen}
            footer={null}
            onCancel={() => setIsOpen(false)}
          >
            <Ticket
              startTime={selectedEvent?._def.extendedProps?.startTime}
              endTime={selectedEvent?._def.extendedProps?.endTime}
              trainerName={selectedEvent?._def.extendedProps?.trainerUUID?.fullName}
              customerName={selectedEvent?._def.extendedProps?.customerUUID?.fullName}
              programName={selectedEvent?._def.extendedProps?.programUUID?.serviceName}
              locationName={selectedEvent?._def.extendedProps?.gymCenterUUID?.centerName}
              ticketId={selectedEvent?._def.extendedProps?._id}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  console.log('render even data', eventContent);
  return (
    <>
      <div>{eventContent.event.title}</div>
    </>
  );
}

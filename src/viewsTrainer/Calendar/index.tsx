import React, { useEffect, useState } from 'react';
import type { EventClickArg, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'antd';
import './calendar.css';
import { Ticket } from '@/viewsCustomer/Bookings/components/Tickets';
import { getTickets } from '@/api/tickets';
//https://fullcalendar.io/docs/react
//https://github.com/fullcalendar/fullcalendar-examples/blob/main/react-typescript/src/DemoApp.tsx
export default function TrainerCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg['event']>();
  const [isOpen, setIsOpen] = useState(false);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getTickets();
      if (res.code === 1) {
        console.log('feach data tickets', res);
        const events = res.data.tickets.map((e) => {
          return {
            id: e.uuid,
            title: e.classroom.serviceName,
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
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            //select={handleDateSelect} // select new even tren calaendar
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick} // open detail event
            /* you can update a remote database when these fire:
                            eventAdd={function(){}}
                            eventChange={function(){}}
                            eventRemove={function(){}}
                            */
            events={bookedEvents}
            height="auto" // will activate stickyHeaderDates automatically!
          />
          <Modal
            title="TICKET INFOMATION"
            open={isOpen}
            footer={null}
            onCancel={() => setIsOpen(false)}
          >
            <Ticket data={selectedEvent?._def.extendedProps} />
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

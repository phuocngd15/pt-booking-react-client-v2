import React, { Fragment, useState } from 'react';
import type { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import './calendar.css';
// import { AddNewBookingTicket, BookingTicket } from '../booking/booking-ticket';
//https://fullcalendar.io/docs/react
//https://github.com/fullcalendar/fullcalendar-examples/blob/main/react-typescript/src/DemoApp.tsx

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export default function Calendar() {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg['event']>();
  const [newEvent, setNewEvent] = useState<DateSelectArg>();
  const [isOpenPopupAddNew, setIsOpenPopupAddNew] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    setIsOpen(true); // open the dialog
  };

  // const renderDialog = () => {
  //   return (
  //     <BookingTicket selectedEvent={selectedEvent} isOpen={isOpen} setIsOpen={handleClosePopup} />
  //   );
  // };
  //
  // const renderAddTicketDialog = () => {
  //   return (
  //     <AddNewBookingTicket
  //       isOpen={isOpenPopupAddNew}
  //       setIsOpen={handleClosePopupAddNew}
  //       selectedEvent={newEvent}
  //     />
  //   );
  // };

  const handleClosePopup = () => {
    setIsOpen(false);
    setSelectedEvent(undefined);
  };
  const handleClosePopupAddNew = () => {
    setIsOpenPopupAddNew(false);
    setNewEvent(undefined);
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };
  const renderSidebar = (
    eventCount: number,
    handleWeekendsToggle: () => void,
    currentEvents: EventApi[],
  ) => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle} />
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({eventCount})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  // const handleAddNewTicketCalBack = (selectInfo: DateSelectArg) => {
  //   const now = new Date().getTime();
  //   const selectTime = selectInfo.start.getTime();
  //   console.log('');
  //   if (selectTime <= now) {
  //     console.log('invalid time');
  //     return;
  //   }
  //   //let title = prompt("Please enter a new title for your event");
  //   const calendarApi = selectInfo.view.calendar;
  //
  //   calendarApi.unselect(); // clear date selection
  //
  //   const addBookingTicket = () => {
  //     if (title) {
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         // title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //         customerID: 'customerID',
  //         ptID: 'ptID',
  //       });
  //     }
  //   };
  // };

  /* const handleEventClick = (clickInfo: EventClickArg) => {
    console.log("clickInfo", clickInfo);
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };*/

  const handleEvents = (events: EventApi[]) => {
    // this.setState({
    //   currentEvents: events,
    // });

    setCurrentEvents(events);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setNewEvent(selectInfo);
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setIsOpenPopupAddNew(true); // open the dialog
  };

  return (
    <div className="demo-app">
      {renderSidebar(currentEvents.length, handleWeekendsToggle, currentEvents)}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          events={INITIAL_EVENTS}
        />
        {/*{renderDialog()}*/}
        {/*{renderAddTicketDialog()}*/}
      </div>
    </div>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  //const [isOpen, setIsOpen]=useState(false)
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{dayjs(event.start!).format('M/D/YYYY h:mm A')}</b>
      <b>{event.end && dayjs(event.end!).format('M/D/YYYY h:mm A')}</b>
      <i>{event.title}</i>
    </li>
  );
}

//ToDo: them time picker cho chon gio, chon ngay,
// them chon pt,

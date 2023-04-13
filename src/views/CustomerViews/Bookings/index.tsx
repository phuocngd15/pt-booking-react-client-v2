import { useEffect, useRef, useState } from 'react';
import timezone from 'dayjs/plugin/timezone';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useNavigate } from 'react-router-dom';
import ServicesSelection from '@/views/CustomerViews/Bookings/components/ServicesSelection';
import './index.less';
import TrainersSelection from '@/views/CustomerViews/Bookings/components/TrainerSelection';
import DateSelection from '@/views/CustomerViews/Bookings/components/DateSelection';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  createBookingTicket,
  fetchAvailableSession,
  fetchPrograms,
  fetchTrainersByServiceId,
} from '@/store/modules/booking';
import type { ServicePrototype } from '@/server/programAPI';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';
import TimeSelection from '@/views/CustomerViews/Bookings/components/TimeSelection';
import CusBookingInfo from '@/views/CustomerViews/Bookings/components/CusBookingInfo';

dayjs.extend(utc);
dayjs.extend(timezone);

const View = () => {
  const dispatch = useAppDispatch();
  const programs = useAppSelector<ServicePrototype[]>((state) => state.bookingPageSlice.programs);
  const trainers = useAppSelector<ITrainer[]>((state) => state.bookingPageSlice.trainers);
  const availableSession = useAppSelector<Dayjs[]>(
    (state) => state.bookingPageSlice.availableSession,
  );

  const [selectedProgram, setSelectedProgram] = useState<ServicePrototype>();
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().add(1, 'day'));
  const [selectedTime, setSelectedTime] = useState<Dayjs>();
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const onSelectProgram = (e: ServicePrototype) => {
    console.log('onSelectService', e);
    setSelectedProgram(e);
    //step1: call get trainers
    if (!e) return;
    dispatch(fetchTrainersByServiceId(e.uuid));
  };

  const onSelectTrainer = (e: any) => {
    console.log('onSelectTrainer', e);
    setSelectedTrainer(e);
    if (!e) return;
    dispatch(
      fetchAvailableSession({
        day: selectedDate?.utc() || dayjs().day(),
        uuid: e?.uuid,
      }),
    );
  };

  const onSelectDate = (e: any) => {
    setSelectedDate(e);
    console.log('onSelectDate', e);
    dispatch(
      fetchAvailableSession({
        day: e.utc(),
        uuid: selectedTrainer?.uuid,
      }),
    );
  };
  const onSelectTime = (e: any) => {
    setSelectedTime(e);
    console.log('onSelectTime', e);
  };

  const onSubmit = () => {
    const params = {
      programsUUID: selectedProgram?.uuid,
      trainerUUID: selectedTrainer?.uuid,
      date: selectedDate,
      time: selectedTime,
      cusName: fullNameRef?.current.value,
      cusPhone: phoneRef?.current.value,
      cusEmail: emailRef?.current.value,
    };
    dispatch(createBookingTicket(params));
    navigate('/customer/ticketSearching');
  };
  return (
    <div className="tracking-[-0.05em ]  mx-auto mt-16 flex-col max-w-container w-full px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-12 space-y-8 ">
      <div className="flex flex-col-reverse justify-center md:flex-row">
        <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
          <div>Booking service</div>
        </h1>
      </div>
      {/*<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">*/}
      <div className="w-full space-y-8 shadow-lg p-10 rounded border">
        <CusBookingInfo phoneRef={phoneRef} emailRef={emailRef} fullNameRef={fullNameRef} />
        <div className="grid xl:grid-cols-4 grid-cols-1">
          <div>
            <div className="text-amber-600 font-bold">SELECT SERVICE</div>
            <ServicesSelection data={programs} onSelect={onSelectProgram} />
          </div>

          {selectedProgram && (
            <>
              <div>
                <div className="text-amber-600 font-bold">SELECT TRAINER (optional)</div>
                <TrainersSelection data={trainers} onSelect={onSelectTrainer} />
              </div>
              <div>
                <div className="text-amber-600 font-bold">DATE</div>
                <DateSelection onSelectCallback={onSelectDate} />
              </div>
            </>
          )}

          {selectedDate && selectedTrainer && (
            <div>
              <div className="text-amber-600 font-bold">TIME</div>
              <TimeSelection availableSession={availableSession} onCheckCallBack={onSelectTime} />
            </div>
          )}
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Booking
        </button>
      </div>
    </div>

    // </div>
  );
};
export default View;

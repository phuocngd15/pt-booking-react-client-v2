import { useEffect, useState } from 'react';
import timezone from 'dayjs/plugin/timezone';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ServicesSelection from '@/views/CustomerViews/Bookings/components/ServicesSelection';
import './index.less';
import TrainersSelection from '@/views/CustomerViews/Bookings/components/TrainerSelection';
import DateSelection from '@/views/CustomerViews/Bookings/components/DateSelection';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
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
  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const onCheckCallBack = (e: any) => {
    console.log('e', e);

    //step1: call get trainers
    dispatch(fetchTrainersByServiceId(e.uuid));
  };

  const onSelectTrainerCallBack = (e: any) => {
    console.log('onSelectTrainerCallBack', e);
    const currentTime = dayjs().tz('Asia/Bangkok');
    console.log('onSelectTrainerCallBack date', currentTime.toString());
    if (!e) return;
    dispatch(fetchAvailableSession({ day: currentTime.toJSON(), uuid: e.uuid }));
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
        <CusBookingInfo />
        <div className="grid xl:grid-cols-4 grid-cols-1">
          <div>
            <div>Select one service:</div>
            <ServicesSelection programs={programs} onCheckCallBack={onCheckCallBack} />
          </div>
          <div>
            <div>Select trainer (optional) </div>{' '}
            <TrainersSelection availableTrainers={trainers} onSelect={onSelectTrainerCallBack} />
          </div>
          <div>
            <div>Date</div> <DateSelection />
          </div>
          <div>
            <div>Time</div> <TimeSelection availableSession={availableSession} />
          </div>
        </div>

        <button
          type="submit"
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

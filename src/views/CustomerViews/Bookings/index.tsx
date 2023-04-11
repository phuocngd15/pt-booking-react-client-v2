import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash-es';
import type { ServicesSelectionProps } from '@/views/CustomerViews/Bookings/components/ServicesSelection';
import ServicesSelection from '@/views/CustomerViews/Bookings/components/ServicesSelection';
import './index.less';
import TrainersSelection from '@/views/CustomerViews/Bookings/components/TrainerSelection';
import TimeSelection from '@/views/CustomerViews/Bookings/components/TimeSelection';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {fetchAvailableSession, fetchPrograms, fetchTrainersByServiceId} from '@/store/modules/booking';
import type { ServicePrototype } from '@/server/programAPI';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';
// import {fetchTrainersAsync} from "@/store/modules/trainers";

const View = () => {
  const dispatch = useAppDispatch();
  const programs = useAppSelector<ServicePrototype[]>((state) => state.bookingPageSlice.programs);
  const trainers = useAppSelector<ITrainer[]>((state) => state.bookingPageSlice.trainers);
  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);
  const [selectedService, setSelectedService] = useState<ServicePrototype>();
  const onCheckCallBack = (e: any) => {
    console.log('e', e);
    if (e.isSelected) {
      //step1: call get trainers
      dispatch(fetchTrainersByServiceId(e.uuid));
      setSelectedService(e);
    } else {
      setSelectedService(undefined);
    }
  };

  const onSelectTrainerCallBack = (e: any) => {
    console.log('onSelectTrainerCallBack', e);
    dispatch(fetchAvailableSession(e.uuid));
  };

  return (
    <div className="tracking-[-0.05em ]  mx-auto mt-16 flex-col max-w-container w-full px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
      <div className="flex flex-col-reverse  justify-between md:flex-row ">
        <div>
          <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
            <div>Booking service</div>
          </h1>
        </div>
      </div>
      <div className="mt-16">
        <div className="md:text-3xl">Select one service:</div>
        <div className="mt-2 grid grid-cols-4 gap-4">
          {programs &&
            programs.map((e) => {
              return (
                <ServicesSelection
                  {...e}
                  onCheckCallBack={onCheckCallBack}
                  key={e.uuid}
                  isSelected={e.uuid === selectedService?.uuid}
                />
              );
            })}
        </div>
        {selectedService && (
          <>
            <TrainersSelection availableTrainers={trainers} onSelect={onSelectTrainerCallBack} />
            <TimeSelection />
          </>
        )}
      </div>
    </div>
  );
};
export default View;

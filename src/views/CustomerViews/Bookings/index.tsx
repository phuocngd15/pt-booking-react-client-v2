import { useState } from 'react';
import { cloneDeep } from 'lodash-es';
import type { ServicesSelectionProps } from '@/views/CustomerViews/Bookings/components/ServicesSelection';
import ServicesSelection from '@/views/CustomerViews/Bookings/components/ServicesSelection';
import './index.less';
import TrainersSelection from '@/views/CustomerViews/Bookings/components/TrainerSelection';
import TimeSelection from '@/views/CustomerViews/Bookings/components/TimeSelection';
import { useAppDispatch } from '@/store/hooks';
import { fetchTrainersByServiceId } from '@/store/modules/booking';

const View = () => {
  const dispatch = useAppDispatch();
  const onCheckCallBack = (e: any) => {
    console.log('e', e);
    const newState = cloneDeep(services);
    newState.forEach((i) => (i.isSelected = false));
    newState.forEach((i) => {
      if (i.uuid === e.uuid) {
        i.isSelected = e.isSelected;
      }
    });
    if (e.isSelected) {
      //step1: call get trainers
      dispatch(fetchTrainersByServiceId(e.serviceUUID));
      setSelectedService(e);
    } else {
      setSelectedService(undefined);
    }
    setServices(newState);
  };
  const [selectedService, setSelectedService] = useState<ServicesSelectionProps>();
  const [services, setServices] = useState<ServicesSelectionProps[]>([
    {
      uuid: '1',
      isSelected: false,
      onCheckCallBack: onCheckCallBack,
      title: 'Class 1',
      serviceUUID: 'serviceUUID',
      serviceType: 'Strength',
      description: 'Growing muscle mass, level beginner',
    },
    {
      uuid: '2',
      isSelected: false,
      onCheckCallBack: onCheckCallBack,
      serviceUUID: 'serviceUUID',
      title: 'Class 2',
      serviceType: 'Strength',
      description: 'Growing muscle mass, level Intermediate',
    },
    {
      uuid: '3',
      isSelected: false,
      onCheckCallBack: onCheckCallBack,
      serviceUUID: 'serviceUUID',
      title: 'Class 2',
      serviceType: 'Strength',
      description: 'Growing muscle mass, level Intermediate',
    },
    {
      uuid: '4',
      isSelected: false,
      onCheckCallBack: onCheckCallBack,
      serviceUUID: 'serviceUUID',
      title: 'Class 2',
      serviceType: 'Strength',
      description: 'Growing muscle mass, level Intermediate',
    },
    {
      uuid: '5',
      isSelected: false,
      onCheckCallBack: onCheckCallBack,
      serviceUUID: 'serviceUUID',
      title: 'Class 2',
      serviceType: 'Strength',
      description: 'Growing muscle mass, level Intermediate',
    },
  ]);

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
          {services.map((e) => {
            return <ServicesSelection {...e} />;
          })}
        </div>
      </div>

      <div className="mt-16">
        {/*<div className="md:text-3xl">Select one trainer(option):</div>*/}
        {/*<div className="mt-2 grid grid-cols-4 gap-4">*/}
        {/*  {services.map((e) => {*/}
        {/*    return <ServicesSelection {...e} />;*/}
        {/*  })}*/}
        {/*</div>*/}
        {selectedService && (
          <>
            <TrainersSelection />
            <TimeSelection />
          </>
        )}
      </div>
    </div>
  );
};
export default View;

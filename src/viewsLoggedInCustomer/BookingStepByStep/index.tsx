import MultipleStepForm from '@/viewsLoggedInCustomer/MultipleStepForm';
import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import ServicesSelection from '@/viewsCustomer/Bookings/components/ServicesSelection';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ServicePrototype } from '@/server/programAPI';
import {
    createBookingTicket,
    fetchAvailableSession,
    fetchPrograms,
    fetchTrainersByServiceId,
} from '@/store/modules/booking';
import TrainersSelection from '@/viewsCustomer/Bookings/components/TrainerSelection';
import { ITrainer } from '@/server/InterfaceMappingDataServer';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import DateSelection from '@/viewsCustomer/Bookings/components/DateSelection';
import TimeSelection from '@/viewsCustomer/Bookings/components/TimeSelection';
dayjs.extend(utc);
dayjs.extend(timezone);
const description = 'This is a description.';
const stepItems = [
  { title: 'SELECT ClASS' },
  {
    title: 'SELECT TRAINER',
  },
  {
    title: 'SELECT TIME',
  },
  {
    title: 'REVIEW BOOKING',
  },
  {
    title: 'Done',
  },
];
export default function BookingStepByStep() {
  const dispatch = useAppDispatch();
  const [selectStep, setSelectStep] = useState(1);

  const programs = useAppSelector<ServicePrototype[]>((state) => state.bookingPageSlice.programs);
  const trainers = useAppSelector<ITrainer[]>((state) => state.bookingPageSlice.trainers);
  const availableSession = useAppSelector<Dayjs[]>(
    (state) => state.bookingPageSlice.availableSession,
  );
  const myProfile = useAppSelector((e) => e.customer.myProfile);
  const [selectedProgram, setSelectedProgram] = useState<ServicePrototype>();
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().add(1, 'day'));
  const [selectedTime, setSelectedTime] = useState<Dayjs>();

  //select program
  const onSelectProgram = (e: ServicePrototype) => {
    console.log('onSelectService', e);
    setSelectedProgram(e);
    //step1: call get trainers
    if (!e) return;
    dispatch(fetchTrainersByServiceId(e.uuid));
  };

  // call api get program
  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  //select trainer
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

  //select date
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

  //select time
  const onSelectTime = (e: any) => {
    setSelectedTime(e);
    console.log('onSelectTime', e);
  };
    const onSubmit = () => {
      console.log("myProfile",myProfile)
        const params = {
            programsUUID: selectedProgram?.uuid,
            trainerUUID: selectedTrainer?.uuid,
            date: selectedDate,
            time: selectedTime,
            cusName: myProfile?.fullName,
            cusPhone: myProfile.phone,
            cusEmail: myProfile.email,
        };
         dispatch(createBookingTicket(params));
    };
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col lg={4} sm={24} xs={24}>
          <Card>
            <MultipleStepForm
              stepItems={stepItems}
              selectedDefault={1}
              onChangeSelect={setSelectStep}
            />
          </Card>
        </Col>
        <Col lg={20} sm={24} xs={24}>
          <Card>
            <div hidden={selectStep !== 0}>
              <div className="text-amber-600 font-bold">SELECT ClASS</div>
              <ServicesSelection data={programs} onSelect={onSelectProgram} />
            </div>
            <div hidden={selectStep !== 1}>
              <div className="text-amber-600 font-bold">SELECT TRAINER (optional)</div>
              <TrainersSelection data={trainers} onSelect={onSelectTrainer} />
            </div>
            <div hidden={selectStep !== 2}>
              <div>
                <div className="text-amber-600 font-bold">DATE</div>
                <DateSelection onSelectCallback={onSelectDate} />
              </div>
              <div>
                <div className="text-amber-600 font-bold">TIME</div>
                <TimeSelection availableSession={availableSession} onCheckCallBack={onSelectTime} />
              </div>
            </div>
            <div hidden={selectStep !== 3}>
              <div>

                <div>
                  Class: {selectedProgram?.serviceName}
                </div>

                <button
                  type="submit"
                  onClick={onSubmit}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Xác nhận Booking
                </button>
              </div>
            </div>
            <div hidden={selectStep !== 4}>
                <div>
                   Cảm ơn bạn đã booking
                  <a href={'/calendar'} >Xem Lịch tập</a>
                </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

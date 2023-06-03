import { Button, Card, Col, Row, message, Steps } from 'antd';
import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import type { ServicePrototype } from '@/server/programAPI';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';
import DateSelection from '@/viewsCustomer/Bookings/components/DateSelection';
import TimeSelection from '@/viewsCustomer/Bookings/components/TimeSelection';
import ProgramsCarousel from '@/viewsLoggedInCustomer/BookingStepByStep/component/ProgramsCarousel';
import type { Programs } from '@/api/programs';
import { getAllSessionAvailableOfTrainerByDate } from '@/api/tickets';
import { getPrograms } from '@/api/programs';
import TrainerCarousel from '@/viewsLoggedInCustomer/BookingStepByStep/component/TrainerCarousel';
import { bookingSession } from '@/server/programAPI';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
import { Ticket } from '@/viewsCustomer/Bookings/components/Tickets';
dayjs.extend(utc);
dayjs.extend(timezone);

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
  const [selectStep, setSelectStep] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<Programs>();
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().add(1, 'day'));
  const [selectedTime, setSelectedTime] = useState<Dayjs>();

  const [programs, setPrograms] = useState<Programs[]>();
  const [availableSession, setAvailableSession] = useState<Dayjs[]>();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // ticketBooking result

  const [ticketBookingResult, setTicketBookingResult] = useState<any>(undefined);

  const warning = (content) => {
    messageApi.open({
      type: 'warning',
      content: content,
    });
  };
  //select programf
  const onSelectProgram = async (e: ServicePrototype) => {
    console.log('onSelectService', e);
    setSelectedProgram(e);
  };

  // call api get program

  useEffect(() => {
    (async () => {
      const res = await getPrograms();
      if (res.code === 1) {
        setPrograms(res.data);
        return res.data;
      }
    })();
    return () => {};
  }, []);

  //select trainer
  const onSelectTrainer = async (e: any) => {
    console.log('onSelectTrainer', e);
    setSelectedTrainer(e);
    if (!e) return;
    const day = selectedDate?.utc() || dayjs().day();
    const uuid = e?.uuid;
    const res = await getAllSessionAvailableOfTrainerByDate(day, uuid);

    if (res.code === 1) {
      console.log(res.data);
      setAvailableSession(res.data);
    }
  };

  //select date
  const onSelectDate = async (e: any) => {
    setSelectedDate(e);
    const day = e.utc();
    const uuid = selectedTrainer?._id;
    const res = await getAllSessionAvailableOfTrainerByDate(day, uuid);
    if (res.code === 1) {
      setAvailableSession(res.data);
    }
  };

  //select time
  const onSelectTime = (e: any) => {
    setSelectedTime(e);
    console.log('onSelectTime', e);
  };

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const onSubmit = async () => {
    enterLoading(0);
    const userInfo = getStorage<UseInfoType>('userInfo');
    console.log('userInfo', userInfo);
    console.log('selectedTrainer', selectedTrainer);

    const params = {
      programsUUID: selectedProgram?._id,
      trainerUUID: selectedTrainer?._id,
      date: selectedDate,
      time: selectedTime,
      cusName: userInfo?.profile.fullName,
      cusPhone: userInfo?.profile.phone,
      cusEmail: userInfo?.profile.email,
    };
    if (!params.programsUUID) {
      warning('please chose programs');
      return;
    }
    const res = await bookingSession(params);
    if (res.code === 1) {
      //setData(res.data);
      console.log(res.data);
      setTicketBookingResult(res.data);
      setSelectStep(4);
    }
    //dispatch(createBookingTicket(params));
  };

  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col lg={4} sm={24} xs={24}>
          <Card>
            <Steps
              direction="vertical"
              size="small"
              current={selectStep}
              items={stepItems}
              onChange={setSelectStep}
            />
          </Card>
        </Col>
        <Col lg={20} sm={24} xs={24}>
          <Card>
            <div hidden={selectStep !== 0}>
              <div className="text-amber-600 font-bold">SELECT ClASS</div>
              <ProgramsCarousel
                programs={programs}
                onSelect={onSelectProgram}
                selectedProgram={selectedProgram}
              />
            </div>
            <div hidden={selectStep !== 1}>
              <div className="text-amber-600 font-bold">SELECT TRAINER (optional)</div>
              <TrainerCarousel
                trainers={selectedProgram?.responsibleEmployees}
                onSelect={onSelectTrainer}
                selectedTrainer={selectedTrainer}
              />
            </div>
            <div hidden={selectStep !== 2}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-amber-600 font-bold">DATE</div>
                  <DateSelection onSelectCallback={onSelectDate} />
                </div>
                <div>
                  <div className="text-amber-600 font-bold">TIME</div>
                  <TimeSelection
                    availableSession={availableSession}
                    onCheckCallBack={onSelectTime}
                  />
                </div>
              </div>
            </div>
            <div hidden={selectStep !== 3}>
              <div>
                {contextHolder}
                <div className="text-xl font-bold">REVIEW INFORMATION BOOKING</div>
                <div className="text-lg ">Class: {selectedProgram?.serviceName}</div>
                <div className="text-lg ">Trainer: {selectedTrainer?.fullName}</div>
                <div className="text-lg ">
                  Date: {dayjs(selectedTime).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY')}
                </div>
                <div className="text-lg ">
                  Time: {dayjs(selectedTime).tz('Asia/Ho_Chi_Minh').format('h:mm A')}
                </div>

                <Button type="default" loading={loadings[0]} onClick={onSubmit}>
                  Confirm Booking
                </Button>
              </div>
            </div>
            <div hidden={selectStep !== 4 || ticketBookingResult === undefined}>
              <div>
                <div>Thanks for booking, this is your ticket</div>
                <div>
                  <a href={'/calendar'}>Go to Calendar ? </a>
                </div>
                <div className="w-96">
                  <Ticket
                    trainerName={ticketBookingResult?.trainerUUID?.fullName}
                    customerName={ticketBookingResult?.customerUUID?.fullName}
                    startTime={ticketBookingResult?.startTime}
                    endTime={ticketBookingResult?.endTime}
                    programName={ticketBookingResult?.programUUID?.serviceName}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

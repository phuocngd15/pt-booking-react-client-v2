import Tickets from '@/viewsCustomer/Bookings/components/Tickets';
import './index.less';
import TicketSearching from '@/viewsCustomer/Bookings/components/TicketSearching';
import { useAppSelector } from '@/store/hooks';

const TicketSearchingPage = () => {
  const myTickets = useAppSelector((state) => state.bookingPageSlice.myTickets);
  console.log('my tickets', myTickets);
  return (
    <div className="tracking-[-0.05em]">
      <div className="mx-auto mt-16 flex flex-col-reverse w-full justify-between max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
        <div>
          <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
            <div>MY TICKETS</div>
          </h1>

          <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <TicketSearching />
            <Tickets data={myTickets} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketSearchingPage;

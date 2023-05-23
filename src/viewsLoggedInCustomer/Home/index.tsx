import PhysicalActivity from '@/viewsLoggedInCustomer/PhysicalActivity';
import MultipleStepForm from '@/viewsLoggedInCustomer/MultipleStepForm';
import BookingStepByStep from '@/viewsLoggedInCustomer/BookingStepByStep';

export default function Home() {
  return (
    <div>
       <div className="w-80">
           <PhysicalActivity/>

       </div>
      {/*<BookingStepByStep />*/}
    </div>
  );
}

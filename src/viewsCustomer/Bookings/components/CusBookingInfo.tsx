import React from 'react';

interface CusBookingInfoProps {
  onChangeCallBack?: Function;
  fullNameRef: any;
  emailRef: any;
  phoneRef: any;
}
const CusBookingInfo: React.FC<CusBookingInfoProps> = (props) => {
  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-3 ">
        <div>
          <label className="relative block">
            <div className="text-amber-600 font-bold">FULL NAME</div>
            <span className="sr-only">FullName</span>
            <input
              ref={props.fullNameRef}
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="text"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <div className="text-amber-600 font-bold">EMAIL</div>
            <span className="sr-only">Email address</span>
            <input
              ref={props.emailRef}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            <div className="text-amber-600 font-bold">PHONE</div>
            <span className="sr-only">Phone address</span>
            <input
              ref={props.phoneRef}
              id="phone"
              name="phone"
              type="text"
              autoComplete="phone"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />
          </label>
        </div>
        <div />
      </div>
    </form>
  );
};
export default CusBookingInfo;

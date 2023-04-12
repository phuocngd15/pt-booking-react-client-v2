import React from 'react';

interface CusBookingInfoProps {
  onChangeCallBack?: Function;
  fullNameRef: any;
  emailRef: any;
  phoneRef: any;
}
const CusBookingInfo: React.FC<CusBookingInfoProps> = (props) => {
  // const fullNameRef = useRef(null);
  // const emailRef = useRef(null);
  // const phoneRef = useRef(null);

  // const handleChange = () => {
  //
  //   if(props.onChangeCallBack){
  //     props.onChangeCallBack({
  //       fullName: fullNameRef?.current?.value,
  //       email: emailRef?.current?.value,
  //       phone: phoneRef?.current?.value,
  //     })
  //   }
  //
  // };
  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-3 ">
        <div>
          <label className="relative block">
            FullName
            <span className="sr-only">FullName</span>
            <input
              ref={props.fullNameRef}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email address"
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            Email
            <span className="sr-only">Email address</span>
            <input
              ref={props.emailRef}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email address"
            />
          </label>
        </div>
        <div>
          <label className="relative block">
            Phone
            <span className="sr-only">Phone address</span>
            <input
              ref={props.phoneRef}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email address"
            />
          </label>
        </div>
        <div />
      </div>
    </form>
    //   </div>
    // </div>
  );
};
export default CusBookingInfo;

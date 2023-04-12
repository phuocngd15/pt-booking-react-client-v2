const CusBookingInfo = () => {
  return (
    // <div className="w-52">
    //     <div>Your infomation</div>
    //   <div className="flex flex-col">
    //     <label>Name</label>
    //     <input type="text" className="bg-gray-100" />
    //     <label>Email</label>
    //
    //     <input className="bg-gray-100" />
    //     <label>Address</label>
    //     <input className="bg-gray-100" />
    //     <label>Phone</label>
    //     <input className="bg-gray-100" />
    //   </div>
    // </div>
    // <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="w-full max-w-md space-y-8 shadow-lg p-10 rounded border">
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-3 ">
        <div>
          <label className="relative block">
            FullName
            <span className="sr-only">FullName</span>
            <input
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

import React, { useRef } from 'react';

export interface TicketSearchingProps {}
const TicketSearching: React.FC<TicketSearchingProps> = () => {
  const ref = useRef();
  const onSearching = () => {
    console.log('searching ticketcode', ref?.current?.value);
  };

  return (
    <div className="ml-8 rounded-2xl border-2 border-gray-200 sm:flex items-center w-fit text-left space-x-3  h-12 bg-white text-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
      <form>
        <label htmlFor="tracking_code">
          <div className="flex w-full items-center flex-1 px-3">
            <input
              onBlur={onSearching}
              ref={ref}
              className="focus:outline-none"
              id="tracking_code2"
              name="tracking_code"
              placeholder="TicketCode"
            />
            <button type="button" className="button-search" onClick={onSearching}>
              <span>
                <svg
                  width="1.25em"
                  height="1.25em"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M.835 8.473C.835 4.276 4.251.86 8.448.86c4.197 0 7.613 3.416 7.613 7.613a7.575 7.575 0 0 1-1.697 4.783l-.11.137 4.33 4.4h.002a.624.624 0 1 1-.884.884l-4.333-4.4-.139.112a7.575 7.575 0 0 1-4.782 1.698c-4.197 0-7.613-3.416-7.613-7.614zM8.448 2.11a6.37 6.37 0 0 0-6.363 6.363 6.37 6.37 0 0 0 6.363 6.363 6.37 6.37 0 0 0 6.363-6.363A6.37 6.37 0 0 0 8.448 2.11z"
                    fill="#5C5C5C"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                </svg>
              </span>
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default TicketSearching;

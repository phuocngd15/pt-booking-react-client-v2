import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash-es';
import { Disclosure } from '@headlessui/react';
import TicketSearching from "@/views/CustomerViews/Bookings/components/TicketSearching";
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
const Index = () => {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState([
    { name: 'Home', href: '/customer/home', current: true },
    { name: 'Trainers', href: '/customer/trainers', current: false },
    { name: 'Booking', href: '/customer/booking', current: false },
    { name: 'Ticket', href: '/customer/ticket', current: false },
  ]);
  const onClick = (path: string) => {
    console.log('path ', path);
    //navigation.find(e=>e.href===path).current=true;
    const newSelectedNav = cloneDeep(selectedNav);
    newSelectedNav.forEach((e) => {
      if (e.href !== path) {
        e.current = false;
      }
      if (e.href === path) {
        e.current = true;
      }
    });
    setSelectedNav(newSelectedNav);
    navigate(path);
  };

  return (
    <header className="sticky top-0 w-full flex-none text-sm font-semibold leading-6 text-slate-900 z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95">
      <Disclosure
        as="nav"
        aria-label="Global"
        className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 "
      >
        {({ open }) => (
          <>
            <div className="relative flex items-center py-[1.125rem]">
              <button
                className="mr-auto flex-none text-slate-900"
                onClick={() => onClick('/customer/home')}
              >
                <span className="sr-only">Booking PT</span>
                {/*<svg className="h-6 w-auto" aria-hidden="true" viewBox="0 0 160 24" fill="none">*/}
                {/*  <path*/}
                {/*    d="M18.724 1.714c-4.538 0-7.376 2.286-8.51 6.857 1.702-2.285 3.687-3.143 5.957-2.57 1.296.325 2.22 1.271 3.245 2.318 1.668 1.706 3.6 3.681 7.819 3.681 4.539 0 7.376-2.286 8.51-6.857-1.701 2.286-3.687 3.143-5.957 2.571-1.294-.325-2.22-1.272-3.245-2.32-1.668-1.705-3.6-3.68-7.819-3.68zM10.214 12c-4.539 0-7.376 2.286-8.51 6.857 1.701-2.286 3.687-3.143 5.957-2.571 1.294.325 2.22 1.272 3.245 2.32 1.668 1.705 3.6 3.68 7.818 3.68 4.54 0 7.377-2.286 8.511-6.857-1.702 2.286-3.688 3.143-5.957 2.571-1.295-.326-2.22-1.272-3.245-2.32-1.669-1.705-3.6-3.68-7.82-3.68z"*/}
                {/*    className="fill-sky-400"*/}
                {/*  />*/}
                {/*  <path*/}
                {/*    d="M51.285 9.531V6.857h-3.166v-3.6l-2.758.823v2.777h-2.348v2.674h2.348v6.172c0 3.343 1.686 4.526 5.924 4.011V17.22c-2.094.103-3.166.129-3.166-1.517V9.53h3.166zm12.087-2.674v1.826c-.97-1.337-2.476-2.16-4.468-2.16-3.472 0-6.357 2.931-6.357 6.763 0 3.805 2.885 6.763 6.357 6.763 1.992 0 3.498-.823 4.468-2.186v1.851h2.758V6.857h-2.758zM59.338 17.4c-2.297 0-4.034-1.723-4.034-4.114 0-2.392 1.736-4.115 4.034-4.115s4.034 1.723 4.034 4.115c0 2.391-1.736 4.114-4.034 4.114zM70.723 4.929c.97 0 1.762-.823 1.762-1.775 0-.977-.792-1.774-1.762-1.774s-1.762.797-1.762 1.774c0 .952.792 1.775 1.762 1.775zm-1.379 14.785h2.758V6.857h-2.758v12.857zm5.96 0h2.757V.943h-2.758v18.771zM95.969 6.857l-2.502 8.872-2.655-8.872h-2.63L85.5 15.73l-2.477-8.872h-2.91l4.008 12.857h2.707l2.68-8.665 2.656 8.665h2.706L98.88 6.857h-2.911zm6.32-1.928c.97 0 1.762-.823 1.762-1.775 0-.977-.792-1.774-1.762-1.774s-1.762.797-1.762 1.774c0 .952.792 1.775 1.762 1.775zm-1.379 14.785h2.758V6.857h-2.758v12.857zm12.674-13.191c-1.736 0-3.115.643-3.957 1.98V6.857h-2.758v12.857h2.758v-6.891c0-2.623 1.43-3.703 3.242-3.703 1.737 0 2.86 1.029 2.86 2.983v7.611h2.757V11.82c0-3.343-2.042-5.297-4.902-5.297zm17.982-4.809v6.969c-.971-1.337-2.477-2.16-4.468-2.16-3.473 0-6.358 2.931-6.358 6.763 0 3.805 2.885 6.763 6.358 6.763 1.991 0 3.497-.823 4.468-2.186v1.851h2.757v-18h-2.757zM127.532 17.4c-2.298 0-4.034-1.723-4.034-4.114 0-2.392 1.736-4.115 4.034-4.115 2.297 0 4.034 1.723 4.034 4.115 0 2.391-1.737 4.114-4.034 4.114z"*/}
                {/*    fill="currentColor"*/}
                {/*  />*/}
                {/*  <path*/}
                {/*    fillRule="evenodd"*/}
                {/*    clipRule="evenodd"*/}
                {/*    d="M145.532 3.429h8.511c.902 0 1.768.36 2.407 1.004.638.643.997 1.515.997 2.424v8.572c0 .909-.359 1.781-.997 2.424a3.394 3.394 0 01-2.407 1.004h-8.511a3.39 3.39 0 01-2.407-1.004 3.438 3.438 0 01-.997-2.424V6.857c0-.91.358-1.781.997-2.424a3.39 3.39 0 012.407-1.004zm-5.106 3.428c0-1.364.538-2.672 1.495-3.636a5.09 5.09 0 013.611-1.507h8.511c1.354 0 2.653.542 3.61 1.507a5.16 5.16 0 011.496 3.636v8.572a5.16 5.16 0 01-1.496 3.636 5.086 5.086 0 01-3.61 1.506h-8.511a5.09 5.09 0 01-3.611-1.506 5.164 5.164 0 01-1.495-3.636V6.857zm10.907 6.251c0 1.812-1.359 2.916-3.193 2.916-1.823 0-3.182-1.104-3.182-2.916v-5.65h1.633v5.52c0 .815.429 1.427 1.549 1.427 1.12 0 1.549-.612 1.549-1.428v-5.52h1.644v5.652zm1.72 2.748V7.457h1.644v8.4h-1.644z"*/}
                {/*    fill="currentColor"*/}
                {/*  />*/}
                {/*</svg>*/}
              </button>
              <div className="hidden md:flex md:items-center">
                <button onClick={() => onClick('/customer/home')}>HOME</button>
                <button className="ml-8" onClick={() => onClick('/customer/trainers')}>
                  TRAINERS
                </button>

                <button className="ml-8" onClick={() => onClick('/customer/booking')}>
                  BOOKING
                </button>
                <div className="ml-2 hidden rounded-full bg-sky-500 px-1.5 py-0.5 text-xs text-white sm:block">
                  New
                </div>
                <button className="ml-8" onClick={() => onClick('/customer/ticketSearching')}>
                  MY TICKETS
                </button>
                {/*<button className="ml-8" onClick={() => onClick('/customer/ticket')}>*/}
                {/*  TICKET*/}
                {/*</button>*/}
              </div>

              <Disclosure.Button
                type="button"
                aria-controls="mobile-menu"
                aria-expanded="false"
                className="-my-1 -mr-1 ml-6 flex h-8 w-8 items-center justify-center  md:hidden"
              >
                <span className="sr-only">Open navigation</span>

                {open ? (
                  <svg
                    className="h-3.5 w-3.5 overflow-visible stroke-slate-900"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L14 14M14 0L0 14" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
                    <path
                      d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </Disclosure.Button>
              <div className="hidden md:ml-8 md:flex md:items-center md:border-l md:border-slate-900/15 md:pl-8">
                <a href="/login">
                  Sign in <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden" id="mobile-menu" aria-disabled={false}>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {selectedNav.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() => onClick(item.href)}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};
export default Index;

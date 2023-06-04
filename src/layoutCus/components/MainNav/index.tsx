import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash-es';
import { Disclosure } from '@headlessui/react';

import { AppLogo } from '@/components/AppLogo';
import { useAppSelector } from '@/store/hooks';
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const Index = () => {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState([
    { name: 'Home', href: '/customer/home', current: true },
    { name: 'Trainers', href: '/customer/trainers', current: false },
    { name: 'Booking', href: '/customer/booking', current: false },
    { name: 'Ticket', href: '/customer/ticketSearching', current: false },
  ]);
  const whoIsUsing = useAppSelector((e) => e.customer.whoIsUsing);
  console.log('whoIsUsing', whoIsUsing);
  const onClick = (path: string) => {
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
    <header className="bg-amber-500 sticky top-0 w-full flex-none text-sm font-semibold leading-6 text-slate-900 z-50 lg:border-b lg:border-slate-900/10  supports-backdrop-blur:bg-white/95">
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
                <AppLogo />
              </button>
              <div className="hidden md:flex md:items-center">
                <button onClick={() => onClick('/customer/home')}>HOME</button>
                <button className="ml-8" onClick={() => onClick('/customer/trainers')}>
                  TRAINERS
                </button>
                <button className="ml-8" onClick={() => onClick('/customer/healthCheck')}>
                  HEALTH CHECK
                </button>

                {/*<button className="ml-8" onClick={() => onClick('/customer/booking')}>*/}
                {/*  BOOKING*/}
                {/*</button>*/}
                <div className="ml-2 hidden rounded-full bg-sky-500 px-1.5 py-0.5 text-xs text-white sm:block">
                  New
                </div>
                <button className="ml-8" onClick={() => onClick('/customer/ticketSearching')}>
                  MY TICKETS
                </button>
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
                {whoIsUsing === undefined ? (
                  <a href="/login">
                    Sign in <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <a href="/home">Dashboard</a>
                )}
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

import { Suspense } from 'react';
import './index.less';
// import { Outlet } from 'react-router-dom';
import VerticalNav from './components/Nav';
import LayoutSpin from '@/components/LayoutSpin';
import GroupTrainers from '@/views/CustomerViews/Trainers/GroupTrainers';

const View = () => {
  return (
    <div className="tracking-[-0.05em]">
      <div className=" mx-auto mt-16 flex flex-col-reverse w-full justify-between max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
        <div>
          <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
            <div>Meet our trainers </div>
          </h1>
          <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-slate-700">
            We believe that great results are achievable through a comfortable and effective human
            interaction rather than ingenious training programms.
          </p>
          <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-slate-700">
            WowFit employs 50+ experienced professionals who have passed expert selection. We are
            confident in their professionalism and ability to find an individual approach.
          </p>
        </div>
      </div>
      <div />
      <div className=" mx-auto mt-16 flex flex-col-reverse w-full justify-between max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
        <VerticalNav />
        <div className="flex-1">
          <Suspense fallback={<LayoutSpin />}>
            {/*<Outlet />*/}
            <GroupTrainers />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default View;

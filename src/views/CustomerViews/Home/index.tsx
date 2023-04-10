import './index.less';
import image1 from '../../../assets/Frame_450-min.png';
import image2 from '../../../assets/wellness-health.jpg';
import CustomCarousel from '@/views/CustomerViews/Home/components/Carousel';

const View = () => {
  return (
    <>
      <div className="tracking-[-0.05em]">
        <div className=" mx-auto mt-16 flex flex-col-reverse w-full justify-between max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
          <div>
            <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
              <div>Online</div>
              <div> Personal Trainer</div>
            </h1>
            <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-slate-700">
              <div>Live 1-on-1 workouts with a personal trainer</div>
              <div>Online. At home, outside, or on the go</div>
              <div>Try your first session for free!</div>
            </p>
            <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-amber-600 text-white hover:bg-amber-400"
                href="/customer/booking"
              >
                <span>Try for Free</span>
              </a>
            </div>
          </div>
          <div className="basis-1/2">
            <img src={image2} alt="" />
          </div>
        </div>
        {/*session2*/}

        <div className=" mx-auto mt-16 grid w-full max-w-container grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
            Personal training is now more affordable and convenient than ever.
          </h1>
          <div
            className="mt-16 lg:flex border-t border-slate-200 sm:space-x-10 md:grid md:grid-cols-3 md:gap-x-8 md:space-x-0"
            role="tablist"
            aria-orientation="horizontal"
          >
            <div>
              <div className="relative -mt-px border-t pb-6 pt-4 text-left md:pb-10 md:pt-8 border-indigo-500">
                <h3>
                  <button
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base [&amp;:not(:focus-visible)]:focus:outline-none text-indigo-600"
                    id="headlessui-tabs-tab-19"
                    role="tab"
                    type="button"
                    aria-selected="true"
                    tabIndex={0}
                    data-headlessui-state="selected"
                    aria-controls="headlessui-tabs-panel-22"
                  >
                    <span className="absolute inset-0 -top-px" />
                    Fill in a short questionnaire
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
                  We'll contact you to learn about your health and fitness background so that your
                  personal trainer can design a training plan tailored to your individual needs.
                </p>
              </div>
            </div>
            <div>
              <div className="relative -mt-px border-t pb-6 pt-4 text-left md:pb-10 md:pt-8 border-transparent hover:border-slate-400">
                <h3>
                  <button
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base [&amp;:not(:focus-visible)]:focus:outline-none text-slate-900"
                    id="headlessui-tabs-tab-20"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex={-1}
                    data-headlessui-state="selected"
                    aria-controls="headlessui-tabs-panel-23"
                  >
                    <span className="absolute inset-0 -top-px" />
                    Get matched with a hand-picked trainer
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
                  Try our free 1−1 service — a video call via Zoom, WhatsApp or Skype with a trainer
                  who will be matched to your preferences and requirements.
                </p>
              </div>
            </div>
            <div>
              <div className="relative -mt-px border-t pb-6 pt-4 text-left md:pb-10 md:pt-8 border-transparent hover:border-slate-400">
                <h3>
                  <button
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base [&amp;:not(:focus-visible)]:focus:outline-none text-slate-900"
                    id="headlessui-tabs-tab-21"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex={-1}
                    data-headlessui-state=""
                    aria-controls="headlessui-tabs-panel-24"
                  >
                    <span className="absolute inset-0 -top-px" />
                    Enjoy expert coaching from a real person
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
                  Your trainer will coach, push and motivate you every step of the way on your
                  fitness journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*session3*/}
        <div className=" mx-auto mt-16 grid w-full max-w-container grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24 sm:text-7xl xl:max-w-[43.5rem]">
          <div className="mx-auto flex max-w-container justify-between">
            <div className="basis-1/2">
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
                Personal Trainer keeps you accountable
              </h1>
              <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
                Your personal trainer will monitor your progression via video sessions, hone your
                technique and help you move towards your goal effectively and safely whilst having
                fun as you go. PT is also the best motivation not to skip sessions or quit training
                altogether.
              </p>
            </div>
            <div className="basis-1/3">
              <img src={image1} alt="" />
            </div>
          </div>
        </div>

        {/*sesion 4 */}
        <div className=" mx-auto mt-16 grid w-full max-w-container grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24 sm:text-7xl xl:max-w-[43.5rem]">
          <div className="mx-auto flex max-w-container justify-between">
            <div className="basis-1/3">
              <img src={image1} alt="" />
            </div>
            <div className="basis-1/2">
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
                Online Training is flexible and never boring
              </h1>
              <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
                Online workouts save time and resources. No more wasting time getting to a gym or
                buying expensive memberships! You'll be able to fit the training sessions into your
                busiest schedule on your own terms.
              </p>
            </div>
          </div>
        </div>
        {/*sesion 5 */}
      </div>
      <div className="tracking-[-0.05em] mx-auto mt-8 grid w-full max-w-container grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-20 ">
        <h1 className="my-8 text-5xl font-extrabold tracking-tight text-slate-900">
          Choose the program you like
        </h1>
        <CustomCarousel />
      </div>
    </>
  );
};
//"Personal training is now more affordable and convenient than ever."
export default View;

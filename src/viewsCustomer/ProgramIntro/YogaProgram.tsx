import PriceProgram from '@/viewsCustomer/ProgramIntro/PriceProgram';

export default function YogaProgram() {
  return (
    <div className=" mx-auto mt-16 block w-full space-y-20 max-w-container px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
      <div className="relative md:flex md:flex-row-reverse justify-between">
        <div key="image intro" className="basis-1/2">
          <img
            src={
              'https://www.ayurvedatourindia.com/wp-content/uploads/2020/09/onlineyogaclassesinahmedabad.jpg'
            }
            alt=""
          />
        </div>
        <div key="intro">
          <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
            <div>Yoga Classes</div>
            <div>With PT</div>
          </h1>
          <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-slate-700">
            <div>Live 1-on-1 workouts with a personal trainer</div>
            <div>Online. At home, outside, or on the go</div>
            <div>Try your first session for free!</div>
          </p>
          <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-amber-600 text-white hover:bg-amber-400"
              href="/login"
            >
              <span>Try for Free</span>
            </a>
          </div>
        </div>
      </div>
      <div className="session-1">
        <div className="mx-auto flex max-w-container justify-between">
          <div className="basis-1/2">
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
              Transform your body and mind with invigorating and calming yoga.
            </h1>
            <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block md:text-lg">
              Experience the transformative power of yoga as it strengthens your body, relaxes your
              mind, and brings harmony to your overall well-being through invigorating and calming
              practices.
            </p>
          </div>
          <div className="basis-1/3">
            <img
              src={
                'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://cdn.filestackcontent.com/apIwB4RNCAfHDVB5syXQ'
              }
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="session-2">
        <div className="mx-auto flex max-w-container justify-between">
          <div className="basis-1/3">
            <img
              src={
                'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/04/Virtual-fitness-classes-singapore-900x643.png'
              }
              alt=""
            />
          </div>
          <div className="basis-1/2">
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
              The training is versatile, suitable for both home and yoga center
            </h1>
            <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block md:text-lg">
              Experience the versatility of our training program, perfectly adaptable for practicing
              at home or in a yoga center, providing flexibility and convenience to suit your
              preferences.
            </p>
          </div>
        </div>
      </div>
      <div>
        <PriceProgram />
      </div>
    </div>
  );
}

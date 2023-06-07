import PriceProgram from '@/viewsCustomer/ProgramIntro/PriceProgram';

export default function StrengthProgram() {
  return (
    <div className=" mx-auto mt-16 block w-full space-y-20 max-w-container px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
      <div className="relative md:flex md:flex-row-reverse justify-between">
        <div key="image intro" className="basis-1/2">
          <img
            src={
              'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/11/Strength-training-programs.jpg?fit=1988%2C1327&ssl=1'
            }
            alt=""
          />
        </div>
        <div key="intro">
          <h1 className="basis-2/3  row-start-2 mt-4 max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
            <div>Strength Training</div>
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
              Your Personal Trainer Increases Your Progression Manifold
            </h1>
            <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block md:text-lg">
              The personalized approach to strength training ensures that you perform the most
              effective exercises tailored to your specific goals. Your trainer will carefully
              curate exercise sets and provide guidance on proper form. Mastering complex exercises
              with weights is essential for injury prevention. Training alongside a real person adds
              motivation and enjoyment to your workouts.
            </p>
          </div>
          <div className="basis-1/3">
            <img
              src={
                'https://www.themanual.com/wp-content/uploads/sites/9/2020/12/mandumbbells.jpg?fit=800%2C533&p=1'
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
                'https://img.freepik.com/premium-photo/couple-two-training-together-gym_7502-1911.jpg'
              }
              alt=""
            />
          </div>
          <div className="basis-1/2">
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
              Training Can Be Used Both at Home and in Gym
            </h1>
            <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block md:text-lg">
              You have the option to work out at home with or without equipment, saving time and
              enjoying the comfort of your own space. Alternatively, you can use a selfie-stick
              tripod in the gym for cost-effective training that yields the same results as
              in-person sessions. The key benefit is the ability to combine different training
              types, effortlessly fitting them into your schedule.
            </p>
          </div>
        </div>
      </div>
      <div className="session-3">
        <div className="mx-auto flex max-w-container justify-between">
          <div className="basis-1/2">
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900">
              Benefits of Strength Training
            </h1>
            <div className="mt-2 hidden text-sm leading-6 text-slate-700 md:block md:text-lg pl-10 ">
              <ul className="list-disc">
                <li>Growing muscle mass</li>
                <li>Changing your body measurements to achieve the desired shape</li>
                <li>Feeling better</li>
              </ul>
            </div>
          </div>
          <div className="basis-1/3">
            <img
              src={'https://qph.cf2.quoracdn.net/main-qimg-c51bda1fb3109563fb954ef5c1a76d3b-lq'}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <PriceProgram />
      </div>
    </div>
  );
}

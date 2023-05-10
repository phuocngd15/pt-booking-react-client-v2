export default function HealthCheck() {
  return (
    <div className=" mx-auto mt-16 flex flex-col-reverse w-full justify-between max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
      <div>
        <div className="mb-10">
          <h1 className="max-w-[36rem] text-5xl font-extrabold tracking-tight text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
            <div>Health Check BMI</div>
          </h1>
          <p>
            <div>
              Pt-booking cung cấp bộ công cụ đo lường chỉ số sức khỏe cơ bản và gợi ý nội dung phù
              hợp,
            </div>
            <div>tập luyện và dinh dưỡng để giúp bạn quản lý sức khỏe tốt hơn mỗi ngày.</div>
          </p>
        </div>
        <ul>
          <li className="bg-neutral-100 position-relative margin-bottom-md padding-0@sm padding-unit">
            <div className="grid grid-cols-12 cursor-pointer">
              <div className="col-span-3 md:col-span-1 bg-amber-400">
                <div className="crop crop--fit width-100% bg-accent">
                  <div className="flex flex-center crop__content">
                    <img
                      data-src="https://storage.googleapis.com/leep_app_website/2020/12/yD5QBDIS-ic-bmi.png"
                      alt="bmi"
                      src="https://storage.googleapis.com/leep_app_website/2020/12/yD5QBDIS-ic-bmi.png"
                      className="loaded"
                      data-was-processed="true"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-9 md:col-span-11 position-relative">
                <div className="ml-2 p-5">
                  <p className="text-md font-semibold color-contrast-higher">
                    Công cụ đo chỉ số BMI
                  </p>
                  <p className="display@sm">
                    Công cụ đo chỉ số BMI sẽ cho bạn biết tình trạng sức khỏe của bạn đang bình
                    thường, thiếu cân, thừa cân hay béo phì.
                  </p>
                </div>
              </div>
            </div>
          </li>
          {/*<li className="bg-neutral-100 position-relative margin-bottom-md padding-0@sm padding-unit">*/}
          {/*  <a*/}
          {/*    href="https://leep.app/cong-cu-kiem-tra-suc-khoe/do-luong-chi-so-bmr"*/}
          {/*    className="position-absolute absolute-full z-index-1"*/}
          {/*    data-wpel-link="internal"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    data-src="/app/themes/cs-leep-app/public/img/bg-bmi.svg"*/}
          {/*    alt="bmi"*/}
          {/*    className="position-absolute bottom-0 right-0 loaded"*/}
          {/*    src="/app/themes/cs-leep-app/public/img/bg-bmi.svg"*/}
          {/*    data-was-processed="true"*/}
          {/*  />*/}
          {/*  <div className="grid gap-0@sm gap-unit items-center">*/}
          {/*    <div className="col-2">*/}
          {/*      <div className="crop crop--fit width-100% bg-accent">*/}
          {/*        <div className="flex flex-center crop__content">*/}
          {/*          <img*/}
          {/*            data-src="https://storage.googleapis.com/leep_app_website/2020/12/kX9TQOf3-ic-bmr.png"*/}
          {/*            alt="bmi"*/}
          {/*            src="https://storage.googleapis.com/leep_app_website/2020/12/kX9TQOf3-ic-bmr.png"*/}
          {/*            className="loaded"*/}
          {/*            data-was-processed="true"*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="col-10 position-relative">*/}
          {/*      <div className="text-component padding-md@sm height-100%">*/}
          {/*        <p className="text-md font-semibold color-contrast-higher has-margin@sm">*/}
          {/*          Công cụ đo chỉ số BMR*/}
          {/*        </p>*/}
          {/*        <p className="display@sm">*/}
          {/*          Công cụ kiểm tra chỉ số BMR sẽ giúp bạn biết được lượng calorie cần thiết của cơ*/}
          {/*          thể mình cho các hoạt động hàng ngày.*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</li>*/}
        </ul>
      </div>
    </div>
  );
}

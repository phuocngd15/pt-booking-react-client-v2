import { Card, Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import ToolBMI from '@/viewsCustomer/HealthCheck/BMI';
import WhatBMI from '@/viewsCustomer/HealthCheck/BMI/WhatBMI';
import WhatMBIResultMean from '@/viewsCustomer/HealthCheck/BMI/WhatBMIResultMean';
import ResultBMI from '@/viewsCustomer/HealthCheck/BMI/ResultBMI';
import './healthCheck.css';

export default function HealthCheck() {
  // set form info
  // neu co form info thi render ket qua
  const [result, setResult] = useState(undefined);
  const calculateBM = (value) => {
    console.log(value);
    setResult(value);
  };
  return (
    <div>
      <CheckBMI calculateBM={calculateBM} hidden={result !== undefined} />
      <ResultCheckBMI result={result} hidden={result === undefined} setResult={setResult} />
    </div>
  );
}
export function CheckBMI({ calculateBM, hidden }) {
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      }  mx-auto mt-16 w-full  max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24`}
    >
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
        </ul>
      </div>
      <div className="flex">
        <Card size="small">
          <ToolBMI onSubmit={calculateBM} />
        </Card>
        <Card size="small">
          <WhatBMI />
        </Card>
      </div>
    </div>
  );
}
export function ResultCheckBMI({ result, hidden, setResult }) {
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      }  mx-auto mt-16 w-full  max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24`}
    >
      {' '}
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
                    Kết quả đo chỉ số BMI
                  </p>
                  <p className="display@sm">
                    Dựa vào chỉ số BMI bạn sẽ biết sức khỏe và cơ thể hiện tại cần cải thiện như thế
                    nào.
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex">
        <Card size="small">
          <ResultBMI result={result} setResult={setResult} />
        </Card>
        <Card size="small">
          <WhatMBIResultMean />
        </Card>
      </div>
    </div>
  );
}

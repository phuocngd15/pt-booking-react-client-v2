import { Card, Col, Row } from 'antd';

export default function PriceProgram() {
  return (
    <div className="bg-slate-100 p-10">
      <div className="text-center text-4xl font-extrabold tracking-tight text-slate-900 mb-5">
        Choose your Plan
      </div>
      <div className="flex justify-around">
        <div className="text-center drop-shadow-lg">
          <Card title={<div className="text-xl font-extrabold">BASIC</div>}>
            <div className="space-y-4">
              <div>
                <span className="text-2xl font-medium">8 sessions</span>
              </div>
              <div>
                <span className="text-2xl font-bold">$32.50</span>
                <span>/per session</span>
              </div>
              <div>Total: $260</div>
              <div>
                <ButtonTryForFree />
              </div>
            </div>
          </Card>
        </div>
        <div className="text-center drop-shadow-lg">
          <Card title={<div className="text-xl font-extrabold">PLUS</div>}>
            <div className="">
              <div>
                <span className="text-xl font-semibold">12 sessions</span>
              </div>
              <div>
                <div className="text-2xl line-through">$32.50</div>
                <span className="text-2xl font-bold">$29.90</span>
                <span>/per session</span>
              </div>
              <div>Total: $359</div>
              <div className="text-cyan-700 font-semibold">SAVE 7%</div>
              <div>
                <ButtonTryForFree />
              </div>
            </div>
          </Card>
        </div>
        <div className="text-center drop-shadow-lg">
          <Card title={<div className="text-xl font-extrabold">SUPPER</div>}>
            <div className="">
              <div>
                <span className="text-xl font-semibold">12 sessions</span>
              </div>
              <div>
                <div className="text-2xl line-through">$32.50</div>
                <span className="text-2xl font-bold">$27.50</span>
                <span>/per session</span>
              </div>
              <div>Total: $659</div>
              <div className="text-cyan-700 font-semibold">SAVE 15%</div>
              <div>
                <ButtonTryForFree />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
function ButtonTryForFree() {
  return (
    <div className="space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <a
        className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-amber-600 text-white hover:bg-amber-400"
        href="/login"
      >
        <span>Try for Free</span>
      </a>
    </div>
  );
}

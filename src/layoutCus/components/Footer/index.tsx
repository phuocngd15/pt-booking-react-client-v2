import React from 'react';

export default function CustomerLayoutFooter() {
  return (
    <div className="bg-amber-500 mt-10">
      <div className="flex flex-row justify-around text-sm">
        <div className="">
          <h4 className="">
            <strong className="">LIÊN HỆ</strong>
          </h4>
          <ul className="">
            <li className="text-component line-height-xl">
              <span className="col-3@lg col-4">Địa chỉ:</span>
              <span className="col-9@lg col-8">
                <a
                  className="color-contrast-dark"
                  href=""
                  data-wpel-link="external"
                  target="_blank"
                  rel="nofollow external noopener noreferrer"
                >
                  33 Nguyễn Duy, Phường Duy Hưng, TDM, Bình Dương
                </a>
              </span>
            </li>
            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Giờ làm việc: </span>
              <span className="col-9@lg col-8">
                <span className="footer-small-text">09.00 AM - 06.00 PM</span>
              </span>
            </li>

            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Email:</span>
              <span className="col-9@lg col-8">
                <a className="color-contrast-dark" href="mailto:secoder79@gmail.com">
                  secoder79@gmail.com
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-v5__colophon mt-10 padding-bottom-xl padding-bottom-0@sm">
          <p className="footer-v5__print">©2023 PTBooking. All Right Reserved</p>
          <p className="footer-v5__print">Giấy phép ĐKKD số: 01234567890 | Ký ngày 15/01/2023</p>
        </div>
      </div>
    </div>
  );
}

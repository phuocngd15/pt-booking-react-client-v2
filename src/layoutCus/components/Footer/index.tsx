import React from 'react';

export default function CustomerLayoutFooter() {
  return (
    <div className="bg-amber-500 mt-10">
      <div className="">
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
                  href="https://www.google.com/maps/place/LEEP.APP/@10.7459013,106.6991957,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xbf1f7e427562bff7!8m2!3d10.7459013!4d106.7013844"
                  data-wpel-link="external"
                  target="_blank"
                  rel="nofollow external noopener noreferrer"
                >
                  33 Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TP. HCM
                </a>
              </span>
            </li>
            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Giờ làm việc:</span>
              <span className="col-9@lg col-8">
                <span className="footer-small-text">09.00 AM - 06.00 PM</span>
              </span>
            </li>
            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Tổng đài:</span>
              <span className="col-9@lg col-8">
                <a
                  className="color-contrast-dark"
                  href="tel:+8428 71010999"
                  data-wpel-link="internal"
                >
                  +84 287 1010 999
                </a>
              </span>
            </li>
            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Email:</span>
              <span className="col-9@lg col-8">
                <a className="color-contrast-dark" href="mailto:lisa@leep.app">
                  lisa@leep.app
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-v5__colophon margin-top-lg padding-bottom-xl padding-bottom-0@sm">
          <p className="footer-v5__print">©2023 PTBooking. All Right Reserved</p>
          <p className="footer-v5__print">Giấy phép ĐKKD số: 01234567890 | Ký ngày 15/01/2023</p>
        </div>
      </div>
    </div>
  );
}

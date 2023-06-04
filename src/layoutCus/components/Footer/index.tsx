import React from 'react';

export default function CustomerLayoutFooter() {
  return (
    <div className=" bg-amber-500 mt-10">
      <div className="">
        <div className="">
          <h4 className="">
            <strong className="">CONTACT</strong>
          </h4>
          <ul className="">
            <li className="text-component line-height-xl">
              <span className="col-3@lg col-4">Address: </span>
              <span className="col-9@lg col-8">
                <a
                  className="color-contrast-dark"
                  href=""
                  data-wpel-link="external"
                  target="_blank"
                  rel="nofollow external noopener noreferrer"
                >
                  33 Au Co Street, Binh Duong Province
                </a>
              </span>
            </li>
            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Work Time: </span>
              <span className="col-9@lg col-8">
                <span className="footer-small-text">09.00 AM - 06.00 PM</span>
              </span>
            </li>

            <li className="text-component line-height-xl ">
              <span className="col-3@lg col-4">Email: </span>
              <span className="col-9@lg col-8">
                <a className="color-contrast-dark" href="mailto:secoder79@gmail.com">
                  secoder79@gmail.com
                </a>
              </span> <span className="col-9@lg col-8">
                <a className="color-contrast-dark" href="mailto:secoder79@gmail.com">
                  <p className="footer-v5__print">©2023 PTBooking. All Right Reserved</p>
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-v5__colophon mt-10 padding-bottom-xl padding-bottom-0@sm">

        </div>
      </div>
    </div>
  );
}

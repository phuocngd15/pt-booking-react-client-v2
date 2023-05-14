export default function WhatBMI() {
  return (
    <div
      className="text-component padding-y-xl padding-x-lg margin-0@md margin-x-n-unit"
      data-theme="default"
    >
      <h2 className="text-md font-semibold color-contrast-higher">BMI là gì?</h2>
      <ul>
        <li>
          <p>BMI viết tắt của Body Mass Index nghĩa là chỉ số khối cơ thể.</p>
        </li>
        <li>
          <p>Chỉ số BMI thể hiện sự tương quan giữa cân nặng và chiều cao của bạn.</p>
        </li>
        <li>
          <p>
            Dựa vào chỉ số này bạn có thể xác định cơ thể của mình đang khỏe mạnh, thiếu hay thừa
            cân.
          </p>
        </li>
      </ul>
      <h2 className="text-md font-semibold color-contrast-higher">
        Chỉ số BMI có quan trọng không?
      </h2>
      <ul>
        <li>
          <p>
            Chỉ số BMI đóng vai trò quan trọng trong việc giúp bạn xác định các rủi ro sức khỏe tiềm
            ẩn. Con số này sẽ báo hiệu bạn nên duy trì hay cải thiện tình trạng sức khỏe hiện tại.
            Nhiều nghiên cứu cho thấy chỉ số BMI cao cũng cảnh báo một số bệnh như béo phì, xương
            khớp, huyết áp,...
          </p>
        </li>
        <li>
          <p>
            Tuy nhiên không áp dụng chỉ số BMI đối với phụ nữ mang thai, vận động viên thể hình,
            người già và chỉ số này có sự khác nhau giữa các quốc gia.
          </p>
        </li>
      </ul>
    </div>
  );
}

import { Button } from 'antd';

function calculateBMI(weight, height) {
  if (!weight || !height) return [0, 0];
  // Convert height to meters
  const heightM = height / 100;

  // Calculate BMI
  const bmi = Math.round((weight / (heightM * heightM)) * 10) / 10;

  let level = '';

  if (bmi < 18.5) {
    level = 'bmi--level-1';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    level = 'bmi--level-2';
  } else if (bmi >= 25 && bmi <= 29.9) {
    level = 'bmi--level-3';
  } else if (bmi >= 30 && bmi <= 34.9) {
    level = 'bmi--level-4';
  } else if (bmi >= 35 && bmi <= 39.9) {
    level = 'bmi--level-5';
  } else {
    level = 'Extreme obesity';
  }
  // Round BMI to 1 decimal place

  return [bmi, level];
}
function getBMIMessage(level) {
  switch (level) {
    case 'bmi--level-1':
      return 'BMI của bạn dưới 18.5, đó là biểu hiện của thiếu cân. Hãy tăng cường ăn uống và tham gia các hoạt động thể chất để đạt được cân nặng lý tưởng.';
    case 'bmi--level-2':
      return 'BMI của bạn nằm trong khoảng từ 18.5 đến 24.9, đó là mức độ bình thường. Hãy duy trì chế độ ăn uống lành mạnh và thường xuyên tập luyện để duy trì trạng thái sức khỏe tốt.';
    case 'bmi--level-3':
      return 'BMI của bạn nằm trong khoảng từ 25 đến 29.9, đó là biểu hiện của thừa cân. Hãy cố gắng giảm cân bằng cách hạn chế thức ăn chứa đường và chất béo, ăn nhiều rau củ và thực phẩm giàu chất xơ, và tăng cường hoạt động thể chất.';
    case 'bmi--level-4':
      return 'BMI của bạn nằm trong khoảng từ 30 đến 34.9, đó là mức độ béo phì cấp độ 1. Hãy thực hiện các biện pháp giảm cân bằng cách tập luyện thường xuyên, ăn chế độ ăn uống lành mạnh và hạn chế đồ ăn nhanh, thức ăn chứa đường và chất béo.';
    case 'bmi--level-5':
      return 'BMI của bạn nằm trong khoảng từ 35 đến 39.9, đó là mức độ béo phì cấp độ 2. Hãy tìm kiếm sự hỗ trợ từ chuyên gia dinh dưỡng hoặc bác sĩ để thực hiện kế hoạch giảm cân an toàn và hiệu quả, cùng với chế độ ăn uống lành mạnh và lối sống tích cực để cải thiện sức khỏe của bạn.';
    default:
      return 'BMI của bạn nằm trong khoảng từ 35 đến 39.9, đó là mức độ béo phì cấp độ 2. Hãy tìm kiếm sự hỗ trợ từ chuyên gia dinh dưỡng hoặc bác sĩ để thực hiện kế hoạch giảm cân an toàn và hiệu quả, cùng với chế độ ăn uống lành mạnh và lối sống tích cực để cải thiện sức khỏe của bạn.';
  }
}

export default function ResultBMI({ result, setResult }) {
  console.log('result ResultBMI', result);
  const [bmi, level] = calculateBMI(result?.user?.weight, result?.user?.height);
  console.log("level",level)
  return (
    <div className="position-relative padding-md@sm padding-bottom-0 text-component margin-bottom-lg">
      <h2 className="text-md font-bold color-accent">Kết quả</h2>
      <p>
        Cân nặng và chiều cao của bạn lần lượt là <span id="user-weight">60</span>kg và{' '}
        <span id="user-height">160</span>cm. <br />
        Chỉ số BMI của bạn là:
      </p>
      <div className={`bmi-display ${level} margin-bottom-lg`}>
        <div className="bmi__result">
          <span id="result">{bmi}</span>
        </div>
        <div className="bmi__bar" />
        <div className="bmi__levels">
          <span className={level === 'bmi--level-1' ? 'active' : ''}>Nhẹ cân</span>
          <span className={level === 'bmi--level-2' ? 'active' : ''}>Bình thường</span>
          <span className={level === 'bmi--level-3' || level === 'bmi--level-4' ? 'active' : ''}>
            Thừa cân
          </span>
          <span className={level === 'bmi--level-5' ? 'active' : ''}>Béo phì</span>
        </div>
      </div>
      {/*<h2 className="text-lg font-semibold  color-contrast-higher">Chỉ số BMI của tôi có ổn không?</h2>*/}
      {/*<p>Chỉ số BMI của bạn là 23.4 Chúc mừng bạn, với chỉ số này cơ thể bạn đang rất khỏe mạnh.</p>*/}
      <h2 className=" font-semibold color-contrast-higher">Tôi cần làm gì để duy trì chỉ số hiện tại?</h2>
      <p>{getBMIMessage(level)}</p>

      <Button
        onClick={() => setResult(undefined)}
        className=" rounded-lg text-sm font-semibold bg-amber-600 text-white hover:bg-amber-400"
      >
        Kiểm tra lại
      </Button>
    </div>
  );
}

import { Button, Card, Form, Input, Select } from 'antd';
import { updateProfile } from '@/api/user';
const { Option } = Select;
export default function ToolBMI({ onSubmit }) {
  const onFinish = (values: any) => {
    console.log('values', values);
    onSubmit(values);
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        id="form-bmi"
        action="/cong-cu-kiem-tra-suc-khoe/ket-qua-do-luong-bmi"
        medthod="get"
        className=" margin-x-auto"
      >
        <div className="flex flex-col justify-center">
          <div className=" mb-5 width-100%" data-theme="default">
            {/*<input*/}
            {/*  type="text"*/}
            {/*  name="height"*/}
            {/*  className="px-2 py-2"*/}
            {/*  required*/}
            {/*  placeholder="Chiều cao (cm)"*/}
            {/*/>*/}
            <Form.Item name={['user', 'height']} rules={[{ required: true }]}>
              <Input placeholder="Chiều cao (cm)" />
            </Form.Item>
          </div>
          <div className=" mb-5 width-100%" data-theme="default">
            {/*<input*/}
            {/*  type="text"*/}
            {/*  name="weight"*/}
            {/*  className="px-2 py-2"*/}
            {/*  required*/}
            {/*  placeholder="Cân nặng (kg)"*/}
            {/*/>*/}
            <Form.Item name={['user', 'weight']} rules={[{ required: true }]}>
              <Input placeholder="Cân nặng (kg)" />
            </Form.Item>
          </div>
          <div className=" mb-5 width-100%" data-theme="default">
            {/*<input type="text" name="age" className="px-2 py-2" required placeholder="Tuổi" />*/}
            <Form.Item name={['user', 'age']} rules={[{ required: true }]}>
              <Input type="number" placeholder="Tuổi" />
            </Form.Item>
          </div>
          <div className="form-item mb-5 width-100%" data-theme="default">
            {/*<select*/}
            {/*  name="actitvities"*/}
            {/*  className="px-2 py-2  "*/}
            {/*  required*/}
            {/*  placeholder="Cường độ tập luyện"*/}
            {/*>*/}
            {/*  <option value="">Chọn cường độ tập luyện</option>*/}
            {/*  <option value="1.2">Ít vận động</option>*/}
            {/*  <option value="1.55">Vận động vừa</option>*/}
            {/*  <option value="1.725">Vận động nhiều</option>*/}
            {/*</select>*/}
            <Form.Item
              name={['user', 'actitvities']}
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select>
                <Option value="0">Chọn cường độ tập luyện</Option>
                <Option value="1.2">Ít vận động</Option>
                <Option value="1.55">Vận động vừa</Option>
                <Option value="1.725">Vận động nhiều</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="form-item">
            <Button
              htmlType="submit"
              className=" rounded-lg text-sm font-semibold bg-amber-600 text-white hover:bg-amber-400"
            >
              Kết quả
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

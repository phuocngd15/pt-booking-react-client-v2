import React from 'react';
import { Form, Input, InputNumber, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { TextArea } = Input;
export interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const ServiceForm1: React.FC<CustomizedFormProps> = ({ onChange, fields }) => {
  console.log('fields', fields);
  const timePickerConfig = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
  };
  return (
    <Form
      {...layout}
      name="global_state"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onFinish={() => {
        console.log('onfinish customizeForm');
      }}
    >
      <Form.Item name="svName" label={<UserOutlined />} rules={[{}]}>
        <Input placeholder={'Tên dịch vụ'} />
      </Form.Item>
      <Form.Item label="Mô tả" name="svDescription">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Thời lượng">
        <Form.Item name="svDurationHours" noStyle>
          <InputNumber min={0} max={24} />
        </Form.Item>
        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          giờ
        </span>
        <Form.Item name="svDurationMinus" noStyle>
          <InputNumber min={1} max={60} />
        </Form.Item>
        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          phút
        </span>
      </Form.Item>

      <Form.Item label="Ghi chú" name="svRemakes">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Số người tham dự tối đa">
        <Form.Item name="svMaxAttendance" noStyle>
          <InputNumber min={1} max={20} />
        </Form.Item>
        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          người (tối đa 20 người)
        </span>
      </Form.Item>
    </Form>
  );
};

export const ServiceForm2: React.FC<CustomizedFormProps> = ({ onChange, fields }) => {
  return (
    <Form
      {...layout}
      name="global_state"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onFinish={() => {
        console.log('onfinish customizeForm');
      }}
    >
      <Form.Item label="Radio" name="svType">
        <Radio.Group>
          <Radio value="apple"> Apple </Radio>
          <Radio value="pear"> Pear </Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

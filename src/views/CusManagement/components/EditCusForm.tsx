import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

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
export const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => {
  if (!fields.length) return;
  const isDiableCMND = fields?.find((e) => e.name === 'cmnd')?.value;
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
      <Form.Item name="fullName" label={<UserOutlined />} rules={[{}]}>
        <Input placeholder={'Tên khách hàng'} />
      </Form.Item>
      <Form.Item name="email" label={<MailOutlined />} rules={[{ required: true, type: 'email' }]}>
        <Input placeholder={'email'} />
      </Form.Item>
      <Form.Item
        name="phone"
        label={<PhoneOutlined />}
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input placeholder={'số điện thoại'} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="cmnd"
        label="CMND"
        rules={[{ required: false, message: 'Please input your identity!' }]}
      >
        <Input disabled={isDiableCMND} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: false, message: 'Please select gender!' }]}
      >
        <Select placeholder="gioi tinh">
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

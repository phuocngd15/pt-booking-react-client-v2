import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
export default function ProfileForm() {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const onFinish = (values: any) => {
    setComponentDisabled((prevState) => !prevState);
    console.log(values);
  };
  const onCancel = () => {
    form.setFieldsValue({ user: { name: 'aaa', gender: 'male' } });
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      form={form}
      validateMessages={validateMessages}
      disabled={componentDisabled}
    >
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'phone']}
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={'+84'} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={['user', 'gender']}
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button hidden={componentDisabled} htmlType="submit" >
          Save
        </Button>
        <Button
          hidden={componentDisabled}
          onClick={() => {
            onCancel();
            setComponentDisabled((prevState) => !prevState);
          }}
        >
          Cancel
        </Button>
        <Button
          hidden={!componentDisabled}
          disabled={!componentDisabled}
          onClick={() => setComponentDisabled((prevState) => !prevState)}
        >
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
}

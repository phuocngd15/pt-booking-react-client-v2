import {
  Layout,
  DatePicker,
  TimePicker,
  Avatar,
  Checkbox,
  List,
  message,
  Typography,
  Row,
  Col,
  Input,
  InputNumber,
} from 'antd';
import React, { useState, useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { UserOutlined } from '@ant-design/icons';

import CustomDropdown from '@/views/Booking/components/CustomDropdown';
import { getPts } from '@/server/getPTList';
import './styles/index.less';
import type { FieldData } from '@/views/CusManagement/components/EditCusForm';
import { CustomizedForm } from '@/views/CusManagement/components/EditCusForm';

const { Footer, Content } = Layout;
const format = 'HH:mm';

const { Title } = Typography;
export const BookingIndex = (props: { customer }) => {
  return (
    <>
      <GeneralService />
      <Row>
        <Col lg={12} sm={24} xs={24}>
          <DetailService />
          <DetailCustomer {...props} />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <DetailStaff />
        </Col>
      </Row>
    </>
  );
};
export const GeneralService = () => {
  return (
    <>
      <CustomDropdown />
    </>
  );
};
export const DetailService = () => {
  const onChange = (value: number | string) => {
    console.log('changed', value);
  };
  return (
    <>
      <Title level={3}>Chi tiết dịch vụ</Title>
      <Row gutter={[24, 24]}>
        <Col span={4}>
          <label>Bắt đầu</label>
        </Col>
        <Col span={20}>
          <DatePicker />
          <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={4}>
          <label>Kết thúc</label>
        </Col>
        <Col span={20}>
          <DatePicker />
          <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={4}>
          <label>Giá</label>
        </Col>
        <Col span={20}>
          <InputNumber
            defaultValue={1000}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  );
};
export const DetailCustomer = ({ customer }) => {
  const [fields, setFields] = useState<FieldData[]>([]);
  useEffect(() => {
    setFields([
      { name: 'fullName', value: `${customer.fullName || ''}` },
      { name: 'email', value: `${customer.email || ''}` },
      { name: 'phone', value: `${customer.phone || ''}` },
      { name: 'gender', value: `${customer.gender || ''}` },
      { name: 'age', value: `${customer.age || ''}` },
      { name: 'cmnd', value: `${customer.cmnd || ''}` },
    ]);
  }, [customer]);

  return (
    <>
      <Title level={3}>Thông tin khách hàng</Title>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
    </>
  );
  if (customer) {
    return (
      <>
        <Title level={3}>Thông tin khách hàng</Title>
        <Input disabled value={customer.name} prefix={<UserOutlined />} />
        <CustomizedForm
          fields={fields}
          onChange={(newFields) => {
            setFields(newFields);
          }}
        />
      </>
    );
  }
  return (
    <>
      <Title level={3}>Thông tin khách hàng</Title>
      <Input placeholder="name" prefix={<UserOutlined />} />
      <Input placeholder="mail" prefix={<UserOutlined />} />
      <Input placeholder="phone" prefix={<UserOutlined />} />
    </>
  );
};

export const DetailStaff = () => {
  return (
    <div className="auto-width">
      <Title level={3}>Nhân viên</Title>
      <StaffList />
    </div>
  );
};

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

export const StaffList = () => {
  const [data, setData] = useState<UserItem[]>([]);
  const [selectStaff, setSelectStaff] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
    setSelectStaff([]);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  const onChange = (e: CheckboxChangeEvent, item: UserItem) => {
    const newVale = cloneDeep(selectStaff);
    newVale.push(item);
    e.target.checked && setSelectStaff(newVale);
    !e.target.checked && setSelectStaff([]);
    // const isSelect = e.target.checked;
    // const processSelectStaff = (isSelect: boolean) => {
    //   console.log(`isSelect = ${isSelect}`);
    //   if (isSelect) {
    //     const newVale = cloneDeep(selectStaff);
    //     setSelectStaff([...newVale, item]);
    //   } else {
    //     const newVale = cloneDeep(selectStaff.filter((e) => e.email != item.email));
    //     setSelectStaff(newVale);
    //   }
    // };
    // processSelectStaff(isSelect);
    // setTimeout(() => {
    //   console.log('selectStaff', selectStaff);
    // }, 1000);
  };
  return (
    <>
      <Input placeholder="default size" prefix={<UserOutlined />} />
      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item: UserItem) => (
            <List.Item key={item.email}>
              <Checkbox key={item.email} onChange={(e) => onChange(e, item)} />
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />

              <div>Content</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};

import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
const { Title } = Typography;
const items: MenuProps['items'] = [
  {
    label: <div>Booking 1h</div>,
    mainLabel: <Title level={4}>Booking 1h</Title>,
    key: '0',
  },
  {
    label: <div>Booking 2h</div>,
    mainLabel: <Title level={4}>Booking 2h</Title>,
    key: '1',
  },
  {
    label: <div>Booking 3h</div>,
    mainLabel: <Title level={4}>Booking 3h</Title>,
    key: '2',
  },
];

//Todo hoan thien cho nay: dùng redux store, ket noi thang voi service, lay list service id, name ra lam thanh item
const CustomDropdown: React.FC = () => {
  const [selectedService, setSelectedService] = React.useState(items[0].mainLabel);
  const onClick: MenuProps['onClick'] = (props) => {
    console.log(`Click on item`, props);
    setSelectedService(items[props.key].mainLabel);
  };
  return (
    <Dropdown
      menu={{ items, selectable: true, defaultSelectedKeys: ['0'], onClick }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {selectedService}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;

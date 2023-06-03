import { Button, Card, Typography } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
const { Title } = Typography;
export const GeneralSession = ({ Name, RoleName, formEdit, formBooking, OpenModalFunc }) => {
  return (
    <Card>
      <Title level={2}>{Name}</Title>
      {/*<h4>{RoleName}</h4>*/}
      {/*<div>*/}
      {/*  <Button onClick={() => OpenModalFunc('1')} type="text" icon={<EditOutlined />}>*/}
      {/*    Chinh sua {RoleName}*/}
      {/*  </Button>*/}
      {/*  <Button onClick={() => OpenModalFunc('2')} type="text" icon={<CalendarOutlined />}>*/}
      {/*    Dat truoc cuoc hen*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {formEdit}
      {formBooking}
    </Card>
  );
};

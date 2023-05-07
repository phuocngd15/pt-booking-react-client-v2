import { Button, Card, Col, Input, Row, Space, Alert } from 'antd';
import React from 'react';
import AvatarUploader from '@/components/AvatarUploader';
// <AvatarUploader />

import ProfileForm from '@/views/Profile/components/ProfileForm';

export default function Profile() {
  return (
    <Row gutter={[12, 12]}>
      <Col lg={8} sm={24} xs={24}>
        <Card size="small" title="">
          <div>
            <AvatarUploader />
          </div>
        </Card>
      </Col>
      <Col lg={16} sm={24} xs={24}>
        <Card size="small" title="">
          {/*<Alert*/}
          {/*  message={*/}
          {/*    <span>*/}
          {/*      This is an <strong>.alert</strong>. Use this to show important messages to the user.*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  type="success"*/}
          {/*/>*/}

          <div className="font-medium text-lg ">PERSONAL INFO</div>

          <ProfileForm />
        </Card>
      </Col>
    </Row>
  );
}

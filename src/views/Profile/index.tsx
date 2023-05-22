import { Button, Card, Col, Input, Row, Space, Alert } from 'antd';
import React from 'react';
import AvatarUploader from '@/components/AvatarUploader';
// <AvatarUploader />

import ProfileForm from '@/views/Profile/components/ProfileForm';
import { useAppSelector } from '@/store/hooks';

export default function Profile() {
  const myProfile = useAppSelector((e) => e.customer.myProfile);
  const whoIsUsing = useAppSelector((e) => e.customer.whoIsUsing);
    console.log("whoIsUsing",whoIsUsing)
  return (
    <Row gutter={[12, 12]}>
      <Col lg={6} sm={24} xs={24}>
        <Card size="small" title="">
          <div>
            <AvatarUploader />
          </div>
        </Card>
      </Col>
      <Col lg={10} sm={24} xs={24}>
        <Card size="small" title="">
          {/*<Alert*/}
          {/*  message={*/}
          {/*    <span>*/}
          {/*      This is an <strong>.alert</strong>. Use this to show important messages to the user.*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  type="success"*/}
          {/*/>*/}

          <div className="font-bold text-lg">PERSONAL INFO</div>

          <ProfileForm myProfile={myProfile} />
        </Card>
      </Col>
    </Row>
  );
}

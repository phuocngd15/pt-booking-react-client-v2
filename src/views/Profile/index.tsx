import { Button, Card, Col, Input, Row, Space, Alert } from 'antd';
import React from 'react';
import AvatarUploader from '@/components/AvatarUploader';
// <AvatarUploader />

import ProfileForm from '@/views/Profile/components/ProfileForm';
import { useAppSelector } from '@/store/hooks';
import { getStorage } from '@/utils/storage';
import { UseInfoType } from '@/api/auth';

export default function Profile() {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return (
    <Row gutter={[12, 12]}>
      <Col lg={6} sm={24} xs={24}>
        <Card size="small" title="">
          <div>
            <AvatarUploader avatar={userInfo?.profile.avatar} />
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

          <ProfileForm myProfile={userInfo?.profile} />
        </Card>
      </Col>
    </Row>
  );
}

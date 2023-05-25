import React, { useEffect, useState } from 'react';
import { Card, Col, Modal, Row } from 'antd';
import { useAppSelector } from '@/store/hooks';
import type { FieldData } from '@/views/CusManagement/components/EditCusForm';
import { CustomizedForm } from '@/views/CusManagement/components/EditCusForm';
import { GeneralSession } from '@/components/Uncategorized/GeneralSession';
import { BookingIndex } from '@/views/Booking';
import dayjs from 'dayjs';

export const DetailCusGrid = () => {
  const customerDetail = useAppSelector((state) => state.customer.detailInfo);
  console.log('customerDetail', customerDetail);
  const [fields, setFields] = useState<FieldData[]>([]);
  useEffect(() => {
    setFields([
      { name: 'fullName', value: `${customerDetail.fullName}` },
      { name: 'email', value: `${customerDetail.email}` },
      { name: 'phone', value: `${customerDetail.phone}` },
      { name: 'gender', value: `${customerDetail.gender || ''}` },
      { name: 'birthday', value: `${customerDetail.birthday}` },
      { name: 'cmnd', value: `${customerDetail.cmnd}` },
    ]);
  }, [customerDetail]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const handleOpenForm = (form: any) => {
    setIsOpenModal(false);
    setIsOpenModal2(false);
    switch (form) {
      case '1':
        setIsOpenModal(true);
        break;
      case '2':
        setIsOpenModal2(true);
        break;
      default:
        setIsOpenModal(false);
        setIsOpenModal2(false);
    }
  };
  return (
    <Row gutter={[12, 12]}>
      <Col lg={24} sm={24} xs={24}>
        <GeneralSession
          OpenModalFunc={handleOpenForm}
          Name={customerDetail.fullName}
          RoleName={'khach hang'}
          formEdit={
            <Modal
              open={isOpenModal}
              onOk={() => setIsOpenModal(false)}
              okType={'default'}
              onCancel={() => setIsOpenModal(false)}
            >
              <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                  setFields(newFields);
                }}
              />
            </Modal>
          }
          formBooking={
            <Modal
              title=""
              open={isOpenModal2}
              onOk={() => setIsOpenModal2(false)}
              onCancel={() => setIsOpenModal2(false)}
              width={1000}
            >
              <BookingIndex customer={customerDetail} />
            </Modal>
          }
        />
      </Col>
      <Col lg={24} sm={24} xs={24}>
        <Card title={'Thông tin liên lạc'}>
          <div>
            <div>SDT: {fields.find((e) => e.name === 'phone')?.value}</div>
            <div>Gioi tinh: {fields.find((e) => e.name === 'gender')?.value}</div>
            <div>Email: {fields.find((e) => e.name === 'email')?.value}</div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

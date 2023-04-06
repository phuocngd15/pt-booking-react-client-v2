import React, { useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { BookingIndex } from '@/views/Booking';
import { GeneralSession } from '@/components/Uncategorized/GeneralSession';
import CustomTab from '@/views/ServicesManagement/components/CustomTab';
import { EditServiceForm } from '@/views/ServicesManagement/EditService';

export const DetailServiceInfo = () => {
  const detailServiceInfo = useAppSelector((state) => state.services.serviceDetail);
  console.log('DetailServiceInfo render', detailServiceInfo);

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
          Name={detailServiceInfo.name}
          RoleName={''}
          formEdit={
            <Modal
              open={isOpenModal}
              onOk={() => setIsOpenModal(false)}
              onCancel={() => setIsOpenModal(false)}
              width={1000}
            >
              <EditServiceForm />
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
              <BookingIndex customer={''} />
            </Modal>
          }
        />
      </Col>
      <Col lg={24} sm={24} xs={24}>
        <CustomTab />
      </Col>
    </Row>
  );
};

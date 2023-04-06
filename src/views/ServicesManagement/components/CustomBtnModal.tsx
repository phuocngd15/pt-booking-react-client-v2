import { Button, Form, Modal } from 'antd';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

export interface CustomBtnModalProps {
  nameBtn: string;
  customForm: ReactNode;
  icon: ReactNode;
  onCreate: any;
}
const CustomBtnModal: React.FC<CustomBtnModalProps> = ({ nameBtn, customForm, icon, onCreate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button type="primary" icon={icon} onClick={() => setIsOpenModal(true)}>
        {nameBtn}
      </Button>
      <Modal
        width={1000}
        open={isOpenModal}
        onOk={() => onCreate(setIsOpenModal)}
        onCancel={() => setIsOpenModal(false)}
      >
        {customForm}
      </Modal>
    </>
  );
};
export { CustomBtnModal };

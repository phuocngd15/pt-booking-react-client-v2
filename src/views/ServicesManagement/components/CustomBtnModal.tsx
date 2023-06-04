import { Button, Modal } from 'antd';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

export interface CustomBtnModalProps {
  nameBtn: string;
  customForm: ReactNode;
  icon?: ReactNode;
  onOkCallBack: any;
  width: number;
  timeOutClose?: number;
}
const CustomBtnModal: React.FC<CustomBtnModalProps> = ({
  nameBtn,
  customForm,
  icon,
  onOkCallBack,
  width = 1000,
  timeOutClose = 2000,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpenModal(false);
      onOkCallBack(setIsOpenModal);
      setConfirmLoading(false);
    }, timeOutClose);
  };
  return (
    <>
      <Button icon={icon} onClick={() => setIsOpenModal(true)}>
        {nameBtn}
      </Button>
      <Modal
        width={width}
        open={isOpenModal}
        okType={'default'}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setIsOpenModal(false)}
      >
        {customForm}
      </Modal>
    </>
  );
};
export { CustomBtnModal };

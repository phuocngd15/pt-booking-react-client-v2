import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { MultipleForm } from '../components/MultipleForm';
import { CustomBtnModal } from '@/views/ServicesManagement/components/CustomBtnModal';
import { ServiceForm1 } from '@/views/ServicesManagement/components/Forms';
import type { FieldData } from '@/views/CusManagement/components/EditCusForm';
import { addNewService } from '@/server/serviceAPI';

const { Title } = Typography;
const AddNewServiceForm: React.FC = () => {
  const [fields, setFields] = useState<FieldData[]>([
    { name: 'svName', value: `defaultNme` },
    { name: 'svDescription', value: `none` },
    { name: 'location', value: `online` },
    { name: 'svDurationHours', value: `0` },
    { name: 'svDurationMinus', value: `0` },
    { name: 'svPrice', value: `0` },
    { name: 'svRemakes', value: `` },
    { name: 'svMaxAttendance', value: `` },
  ]);
  const [fields2, setFields2] = useState<FieldData[]>([{ name: 'svType', value: `` }]);
  const onSaveForm = async (setIsOpenModal: any): Promise<void> => {
    console.log('onSaveForm');
    console.log('formTab1', fields);
    console.log('formTab2', fields2);
    const params = {
      svName: fields.find((e) => e.name[0] === 'svName')?.value,
      svDescription: fields.find((e) => e.name[0] === 'svDescription')?.value,
      location: fields.find((e) => e.name[0] === 'location')?.value,
      locatsvDurationTimeion: fields.find((e) => e.name[0] === 'svDurationTime')?.value,
      svPrice: fields.find((e) => e.name[0] === 'svPrice')?.value,
      svRemakes: fields.find((e) => e.name[0] === 'svRemakes')?.value,
      svMaxAttendance: fields.find((e) => e.name[0] === 'svMaxAttendance')?.value,
      svType: fields2.find((e) => e.name[0] === 'svType')?.value,
    };
    const res = await addNewService(params);
    if (res.code === 1) {
      console.log('res', res);
      setIsOpenModal(false);
    }
  };

  return (
    <CustomBtnModal
      customForm={
        <>
          <Title level={3}>Thêm dịch vụ mới</Title>
          <MultipleForm
            tabs={[
              {
                tabName: 'Chi tiết cơ bản',
                tabContent: (
                  <ServiceForm1
                    fields={fields}
                    onChange={(newFields) => {
                      setFields(newFields);
                    }}
                  />
                ),
              },
              // {
              //   tabName: 'Chỉ định nhân viên',
              //   tabContent: (
              //     <AddNewFormPar2
              //       fields={fields2}
              //       onChange={(newFields2) => {
              //         setFields2(newFields2);
              //       }}
              //     />
              //   ),
              // },
            ]}
            tabPosition={'left'}
          />
        </>
      }
      onCreate={onSaveForm}
      nameBtn={'Thêm dich vụ mới'}
      icon={<PlusOutlined />}
    />
  );
};

export { AddNewServiceForm };

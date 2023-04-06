import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Radio, Tabs } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

export interface CustomTabProps {
  size?: SizeType;
  tabs?: any;
}
const CustomTab: React.FC<CustomTabProps> = ({
  size = 'small',
  tabs = new Array(3).fill(null).map((_, i) => {
    const id = String(i + 1);
    return {
      label: `Tab ${id}`,
      key: id,
      children: `Content of tab ${id}`,
    };
  }),
}) => {
  return (
    <div>
      <Tabs defaultActiveKey="1" size={size} style={{ marginBottom: 32 }} items={tabs} />
    </div>
  );
};

export default CustomTab;

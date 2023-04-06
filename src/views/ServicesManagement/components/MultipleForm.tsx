import type { ReactNode } from 'react';
import React from 'react';
import { Tabs } from 'antd';
export interface MultipleFormProps {
  tabs: {
    tabName: string;
    tabContent: ReactNode;
  }[];
  tabPosition: 'left' | 'right' | 'top' | 'bottom';
}

export const MultipleForm: React.FC<MultipleFormProps> = ({ tabs, tabPosition }) => {
  return (
    <Tabs
      tabPosition={tabPosition}
      items={new Array(tabs.length).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `${tabs[i].tabName}`,
          key: id,
          children: tabs[i].tabContent,
        };
      })}
    />
  );
};

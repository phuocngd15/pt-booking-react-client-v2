import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCustomers } from '@/api/user';

export default function CustomerSelector({ onChangeSelect }) {
  const options = [
    { value: 0, label: 'Total' },
    { value: 1, label: 'Waiting Confirm' },
    { value: 2, label: 'Confirmed' },
    { value: 3, label: 'Done' },
    { value: 4, label: 'Cancelled' },
  ];
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getCustomers();
      if (result.code) {
        result.data.forEach((e, i) => (e.key = (i + 1).toString()));
        setData(result.data);
      }
    })();
    return () => {};
  }, []);

  function handleOnChangeSelect(optionValue: any) {
    onChangeSelect(optionValue);
  }

  return <Selector onChangeSelect={handleOnChangeSelect} options={options} />;
}
function Selector({ onChangeSelect, options }) {
  function handleOnChangeSelect(optionValue: any) {
    onChangeSelect(optionValue);
  }
  return (
    <div className="relative block">
      <span className="mr-1">Status</span>
      <Select
        defaultValue={0}
        style={{ width: 120 }}
        onChange={handleOnChangeSelect}
        options={options}
      />
    </div>
  );
}

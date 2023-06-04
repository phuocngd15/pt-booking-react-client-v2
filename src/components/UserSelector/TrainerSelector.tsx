import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAccounts } from '@/api/accounts';

export default function TrainerSelector({
  isMulti = false,
  onChangeOption,
  width,
  defaultValue,
}: {
  isMulti?: boolean;
  onChangeOption: Function;
  width: number;
  defaultValue?: any;
}) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getAccounts();
      if (result.code) {
        result.data.forEach((e, i) => (e.key = (i + 1).toString()));
        const options: any[] = [];
        if (!isMulti) {
          options.push({ value: '-1', label: 'None' });
        }
        result.data.forEach((e) => {
          if (e.power === 'trainer') {
            options.push({
              value: e._id,
              label: e?.profile?.fullName,
            });
          }
        });
        setData(options);
      }
    })();
    return () => {};
  }, []);

  function handleOnChangeSelect(optionValue: any) {
    console.log(optionValue);
    onChangeOption(optionValue);
  }

  return (
    <>
      {isMulti ? (
        <MultiSelector onChangeSelect={handleOnChangeSelect} options={data} width={width} defaultValue={defaultValue}  />
      ) : (
        <Selector onChangeSelect={handleOnChangeSelect} options={data} defaultValue={defaultValue} />
      )}
    </>
  );
}
function Selector({ onChangeSelect, options ,defaultValue}) {
  function handleOnChangeSelect(optionValue: any) {
    onChangeSelect(optionValue);
  }
  return (
    <div className="relative block">
      <span className="mr-1">Status</span>
      <Select style={{ width: 120 }} defaultValue={defaultValue} onChange={handleOnChangeSelect} options={options} />
    </div>
  );
}

function MultiSelector({ onChangeSelect, options, width = 100, defaultValue }) {
  function handleOnChangeSelect(optionValue: any) {
    onChangeSelect(optionValue);
  }
  return (
    <div className="relative block">
      <span className="mr-1">Employees</span>
      <Select
        mode="multiple"
        defaultValue={defaultValue}
        allowClear
        style={{ width: width }}
        placeholder="Please select"
        onChange={handleOnChangeSelect}
        options={options}
      />
    </div>
  );
}

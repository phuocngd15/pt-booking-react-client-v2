import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAccounts } from '@/api/accounts';

export default function TrainerSelector({
  isMulti = false,
  onTrainerId,
}: {
  isMulti?: boolean;
  onTrainerId: Function;
}) {
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
      const result = await getAccounts();
      if (result.code) {
        result.data.forEach((e, i) => (e.key = (i + 1).toString()));
        const options: any[] = [{ value: '', label: 'None' }];
        result.data.forEach((e) => {
          if (e.power === 'trainer') {
            options.push({
              value: e._id,
              label: e?.profile?.fullName,
            });
          }
        });
        console.log('mappingdata', options);
        setData(options);
      }
    })();
    return () => {};
  }, []);

  function handleOnChangeSelect(optionValue: any) {
    console.log(optionValue);
    onTrainerId(optionValue);
  }

  return (
    <>
      {isMulti ? (
        <MultiSelector onChangeSelect={handleOnChangeSelect} options={data} />
      ) : (
        <Selector onChangeSelect={handleOnChangeSelect} options={data} />
      )}
    </>
  );
}
function Selector({ onChangeSelect, options }) {
  function handleOnChangeSelect(optionValue: any) {
    onChangeSelect(optionValue);
  }
  return (
    <div className="relative block">
      <span className="mr-1">Status</span>
      <Select style={{ width: 120 }} onChange={handleOnChangeSelect} options={options} />
    </div>
  );
}

function MultiSelector({ onChangeSelect, options }) {
  function handleOnChangeSelect(optionValue: any) {
    onChangeSelect(optionValue);
  }
  return (
    <div className="relative block">
      <span className="mr-1">Status</span>

      <Select
        mode="multiple"
        allowClear
        style={{ width: 120 }}
        placeholder="Please select"
        onChange={handleOnChangeSelect}
        options={options}
      />
    </div>
  );
}

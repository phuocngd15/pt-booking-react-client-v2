import type { StepProps } from 'antd';
import { Steps } from 'antd';
import { useState } from 'react';

export default function MultipleStepForm({
  selectStep = 0,
  onChangeSelect,
  stepItems,
}: {
  selectedDefault: number;
  onChangeSelect: Function;
  stepItems: StepProps[] | undefined;
}) {
  // const [selectStep, setSelectStep] = useState(selectedDefault);
  // const onClickStep = (e: any) => {
  //   console.log(e);
  //   setSelectStep(e);
  //   onChangeSelect(e);
  // };
  return (
    <Steps
      direction="vertical"
      size="small"
      current={selectStep}
      items={stepItems}
      onChange={(e) => onChangeSelect(e)}
    />
  );
}

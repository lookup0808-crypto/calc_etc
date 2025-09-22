import { useState } from 'react';
import { InputForm, InputField } from '../InputForm';

export default function InputFormExample() {
  // todo: remove mock functionality
  const [currentAge, setCurrentAge] = useState(25);
  const [income, setIncome] = useState(4000000);
  const [savingRate, setSavingRate] = useState(0.3);
  const [targetAssets, setTargetAssets] = useState(1300000000);

  return (
    <div className="p-6 bg-background max-w-md">
      <InputForm title="FIRE 시뮬레이션 설정">
        <InputField
          label="현재 나이"
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={80}
        />
        <InputField
          label="월 소득 (원)"
          value={income}
          onChange={setIncome}
          type="currency"
          min={0}
          step={100000}
        />
        <InputField
          label="저축률"
          value={savingRate}
          onChange={setSavingRate}
          type="percentage"
          min={0}
          max={1}
          step={0.01}
        />
        <InputField
          label="목표 자산 (원)"
          value={targetAssets}
          onChange={setTargetAssets}
          type="currency"
          min={0}
          step={10000000}
        />
      </InputForm>
    </div>
  );
}
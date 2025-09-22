import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputForm, InputField } from "@/components/InputForm";
import ChartGraph from "@/components/ChartGraph";
import { Calculator, Clock, TrendingUp } from "lucide-react";

interface FireResult {
  fireAge: number;
  assetsOverTime: { age: number; assets: number }[];
  monthlySaving: number;
  totalSaved: number;
  totalInterest: number;
  yearsToFire: number;
}

export default function FireSimPage() {
  const [currentAge, setCurrentAge] = useState(25);
  const [income, setIncome] = useState(4000000);
  const [savingRate, setSavingRate] = useState(0.3);
  const [targetAssets, setTargetAssets] = useState(1300000000);
  const [annualReturn, setAnnualReturn] = useState(0.07);
  const [result, setResult] = useState<FireResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const simulateFIRE = () => {
    setIsCalculating(true);
    console.log('FIRE 시뮬레이션 시작'); // todo: remove mock functionality
    
    setTimeout(() => {
      let age = currentAge;
      let totalAssets = 0;
      const monthlySaving = income * savingRate;
      const monthlyReturn = annualReturn / 12;
      const assetsOverTime: { age: number; assets: number }[] = [];
      
      // Add initial point
      assetsOverTime.push({ 
        age: parseFloat(age.toFixed(1)), 
        assets: parseFloat(totalAssets.toFixed(2)) 
      });

      while (totalAssets < targetAssets && age < 100) {
        totalAssets = totalAssets * (1 + monthlyReturn) + monthlySaving;
        age += 1 / 12;
        
        // Record data point every 6 months for cleaner chart
        if (Math.round((age - currentAge) * 12) % 6 === 0) {
          assetsOverTime.push({ 
            age: parseFloat(age.toFixed(1)), 
            assets: parseFloat(totalAssets.toFixed(2)) 
          });
        }
      }

      const yearsToFire = age - currentAge;
      const totalSaved = monthlySaving * 12 * yearsToFire;
      const totalInterest = totalAssets - totalSaved;

      setResult({ 
        fireAge: Math.round(age), 
        assetsOverTime, 
        monthlySaving,
        totalSaved,
        totalInterest,
        yearsToFire
      });
      setIsCalculating(false);
    }, 500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
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
          <InputField
            label="연간 수익률"
            value={annualReturn}
            onChange={setAnnualReturn}
            type="percentage"
            min={0}
            max={0.2}
            step={0.001}
          />
          <Button 
            onClick={simulateFIRE} 
            className="w-full mt-4"
            disabled={isCalculating}
            data-testid="button-calculate-fire"
          >
            <Calculator className="h-4 w-4 mr-2" />
            {isCalculating ? "계산 중..." : "시뮬레이션 실행"}
          </Button>
        </InputForm>

        {/* Current Settings Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">현재 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">월 저축액</span>
              <span className="font-medium" data-testid="text-monthly-saving">
                {formatCurrency(income * savingRate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">연간 저축액</span>
              <span className="font-medium">
                {formatCurrency(income * savingRate * 12)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">예상 연간 수익률</span>
              <span className="font-medium">
                {(annualReturn * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary" data-testid="text-fire-age">
                  {result.fireAge}세
                </div>
                <p className="text-sm text-muted-foreground">
                  FIRE 달성 예상 나이
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {result.yearsToFire.toFixed(1)}년
                </div>
                <p className="text-sm text-muted-foreground">
                  목표 달성까지 소요 시간
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(result.totalInterest)}
                </div>
                <p className="text-sm text-muted-foreground">
                  복리 수익 (원)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>상세 분석</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 저축액</span>
                <span className="font-medium">{formatCurrency(result.totalSaved)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">복리 수익</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(result.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-medium">최종 자산</span>
                <span className="font-bold text-primary">
                  {formatCurrency(targetAssets)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>자산 성장 시뮬레이션</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartGraph
                data={result.assetsOverTime}
                title="예상 자산 변화"
                labelKey="age"
                valueKey="assets"
                xAxisLabel="나이"
                yAxisLabel="자산 (원)"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
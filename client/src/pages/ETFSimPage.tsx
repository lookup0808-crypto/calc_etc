import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputForm, InputField } from "@/components/InputForm";
import ChartGraph from "@/components/ChartGraph";
import { Calculator, TrendingUp, BarChart3 } from "lucide-react";

interface ETFData {
  name: string;
  symbol: string;
  avgReturn: number;
  description: string;
}

interface ETFResult {
  finalAmount: number;
  totalInvested: number;
  totalReturn: number;
  cagr: number;
  assetsOverTime: { year: number; amount: number }[];
}

export default function ETFSimPage() {
  // todo: remove mock functionality - ETF data should come from backend
  const etfOptions: ETFData[] = [
    { name: "S&P 500 ETF", symbol: "SPY", avgReturn: 0.10, description: "미국 대형주 500개 기업" },
    { name: "나스닥 ETF", symbol: "QQQ", avgReturn: 0.12, description: "나스닥 100 기술주" },
    { name: "전세계 주식 ETF", symbol: "VTI", avgReturn: 0.08, description: "전세계 분산 투자" },
    { name: "신흥국 ETF", symbol: "VWO", avgReturn: 0.07, description: "신흥국 시장" },
    { name: "리얼 에스테이트 ETF", symbol: "VNQ", avgReturn: 0.09, description: "부동산 투자 신탁" },
  ];

  const [selectedETF, setSelectedETF] = useState<ETFData | null>(null);
  const [initialAmount, setInitialAmount] = useState(13000000);
  const [monthlyAmount, setMonthlyAmount] = useState(650000);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [result, setResult] = useState<ETFResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateETF = () => {
    if (!selectedETF) return;
    
    setIsCalculating(true);
    console.log('ETF 시뮬레이션 시작'); // todo: remove mock functionality
    
    setTimeout(() => {
      const monthlyRate = selectedETF.avgReturn / 12;
      const totalMonths = investmentPeriod * 12;
      let currentAmount = initialAmount;
      const assetsOverTime: { year: number; amount: number }[] = [];
      
      // Add initial amount
      assetsOverTime.push({ year: 0, amount: initialAmount });
      
      // Calculate compound growth with monthly contributions
      for (let month = 1; month <= totalMonths; month++) {
        currentAmount = (currentAmount + monthlyAmount) * (1 + monthlyRate);
        
        // Record annual data points
        if (month % 12 === 0) {
          assetsOverTime.push({ 
            year: month / 12, 
            amount: parseFloat(currentAmount.toFixed(2)) 
          });
        }
      }
      
      const totalInvested = initialAmount + (monthlyAmount * totalMonths);
      const totalReturn = currentAmount - totalInvested;
      const cagr = Math.pow(currentAmount / initialAmount, 1 / investmentPeriod) - 1;
      
      setResult({
        finalAmount: currentAmount,
        totalInvested,
        totalReturn,
        cagr,
        assetsOverTime
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

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <InputForm title="ETF 투자 시뮬레이션 설정">
          <div className="space-y-2">
            <label className="text-sm font-medium">ETF 선택</label>
            <Select 
              onValueChange={(value) => {
                const etf = etfOptions.find(e => e.symbol === value);
                setSelectedETF(etf || null);
              }}
            >
              <SelectTrigger data-testid="select-etf">
                <SelectValue placeholder="ETF를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {etfOptions.map((etf) => (
                  <SelectItem key={etf.symbol} value={etf.symbol}>
                    <div className="flex flex-col">
                      <span className="font-medium">{etf.name} ({etf.symbol})</span>
                      <span className="text-sm text-muted-foreground">
                        평균 수익률: {formatPercentage(etf.avgReturn)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedETF && (
              <p className="text-sm text-muted-foreground mt-1">
                {selectedETF.description}
              </p>
            )}
          </div>
          
          <InputField
            label="초기 투자금 (원)"
            value={initialAmount}
            onChange={setInitialAmount}
            type="currency"
            min={0}
            step={1000000}
          />
          <InputField
            label="월별 적립액 (원)"
            value={monthlyAmount}
            onChange={setMonthlyAmount}
            type="currency"
            min={0}
            step={100000}
          />
          <InputField
            label="투자 기간 (년)"
            value={investmentPeriod}
            onChange={setInvestmentPeriod}
            min={1}
            max={50}
          />
          
          <Button 
            onClick={calculateETF} 
            className="w-full mt-4"
            disabled={!selectedETF || isCalculating}
            data-testid="button-calculate-etf"
          >
            <Calculator className="h-4 w-4 mr-2" />
            {isCalculating ? "계산 중..." : "시뮬레이션 실행"}
          </Button>
        </InputForm>

        {/* ETF Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">선택된 ETF 정보</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedETF ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{selectedETF.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedETF.symbol}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">평균 연간 수익률</span>
                  <span className="font-medium text-green-600">
                    {formatPercentage(selectedETF.avgReturn)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedETF.description}
                  </p>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">총 투자 예정액</span>
                    <span className="font-medium">
                      {formatCurrency(initialAmount + (monthlyAmount * investmentPeriod * 12))}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                ETF를 선택해주세요
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {result && selectedETF && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary" data-testid="text-final-amount">
                  {formatCurrency(result.finalAmount)}
                </div>
                <p className="text-sm text-muted-foreground">
                  최종 자산
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {formatPercentage(result.cagr)}
                </div>
                <p className="text-sm text-muted-foreground">
                  연평균 복합 성장률 (CAGR)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.totalReturn)}
                </div>
                <p className="text-sm text-muted-foreground">
                  총 수익
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Investment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>투자 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">초기 투자금</span>
                <span className="font-medium">{formatCurrency(initialAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 적립액</span>
                <span className="font-medium">
                  {formatCurrency(monthlyAmount * investmentPeriod * 12)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 투자금</span>
                <span className="font-medium">{formatCurrency(result.totalInvested)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>투자 수익</span>
                <span className="font-medium">{formatCurrency(result.totalReturn)}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-medium">최종 자산</span>
                <span className="font-bold text-primary">
                  {formatCurrency(result.finalAmount)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                수익률: {formatPercentage(result.totalReturn / result.totalInvested)}
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>자산 성장 차트</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartGraph
                data={result.assetsOverTime}
                title={`${selectedETF.name} 투자 성장`}
                labelKey="year"
                valueKey="amount"
                xAxisLabel="년차"
                yAxisLabel="자산 (원)"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
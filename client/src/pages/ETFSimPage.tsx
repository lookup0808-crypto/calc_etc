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
  yearlyReturns?: { year: number; return: number }[];
}

interface ETFResult {
  finalAmount: number;
  totalInvested: number;
  totalReturn: number;
  cagr: number;
  assetsOverTime: { year: number; amount: number }[];
}

// 연도별 실제 수익률 mock 데이터 추가
const etfOptions: ETFData[] = [
// 환율 상태 및 fetch 함수 추가
const [exchangeRate, setExchangeRate] = useState<number>(1350); // 기본값: 1350원/USD
const [isFetchingRate, setIsFetchingRate] = useState(false);
const [exchangeRateTime, setExchangeRateTime] = useState<string>("");
const fetchExchangeRate = async () => {
  setIsFetchingRate(true);
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=KRW');
    const data = await res.json();
    if (data && data.rates && data.rates.KRW) {
      setExchangeRate(data.rates.KRW);
      if (data.date) {
        setExchangeRateTime(data.date + ' 기준');
      } else {
        setExchangeRateTime('실시간 조회');
      }
    }
  } catch (e) {
    alert('환율 정보를 불러오지 못했습니다.');
  } finally {
    setIsFetchingRate(false);
  }
};
  { name: "S&P 500 ETF", symbol: "SPY", avgReturn: 0.10, description: "미국 대형주 500개 기업",
    yearlyReturns: [
      { year: 2004, return: 0.10 },
      { year: 2005, return: 0.05 },
      { year: 2006, return: 0.16 },
      { year: 2007, return: 0.05 },
      { year: 2008, return: -0.37 },
      { year: 2009, return: 0.26 },
      { year: 2010, return: 0.15 },
      { year: 2011, return: 0.02 },
      { year: 2012, return: 0.16 },
      { year: 2013, return: 0.32 },
      { year: 2014, return: 0.13 },
      { year: 2015, return: 0.01 },
      { year: 2016, return: 0.12 },
      { year: 2017, return: 0.21 },
      { year: 2018, return: -0.04 },
      { year: 2019, return: 0.31 },
      { year: 2020, return: 0.18 },
      { year: 2021, return: 0.28 },
      { year: 2022, return: -0.18 },
      { year: 2023, return: 0.15 },
    ]
  },
  { name: "나스닥 ETF", symbol: "QQQ", avgReturn: 0.12, description: "나스닥 100 기술주",
    yearlyReturns: [
      { year: 2004, return: 0.08 },
      { year: 2005, return: 0.02 },
      { year: 2006, return: 0.07 },
      { year: 2007, return: 0.11 },
      { year: 2008, return: -0.41 },
      { year: 2009, return: 0.54 },
      { year: 2010, return: 0.19 },
      { year: 2011, return: 0.03 },
      { year: 2012, return: 0.18 },
      { year: 2013, return: 0.37 },
      { year: 2014, return: 0.19 },
      { year: 2015, return: 0.09 },
      { year: 2016, return: 0.07 },
      { year: 2017, return: 0.32 },
      { year: 2018, return: -0.01 },
      { year: 2019, return: 0.39 },
      { year: 2020, return: 0.48 },
      { year: 2021, return: 0.27 },
      { year: 2022, return: -0.33 },
      { year: 2023, return: 0.54 },
    ]
  },
  { name: "전세계 주식 ETF", symbol: "VTI", avgReturn: 0.08, description: "전세계 분산 투자",
    yearlyReturns: [
      { year: 2004, return: 0.09 },
      { year: 2005, return: 0.06 },
      { year: 2006, return: 0.15 },
      { year: 2007, return: 0.06 },
      { year: 2008, return: -0.37 },
      { year: 2009, return: 0.28 },
      { year: 2010, return: 0.17 },
      { year: 2011, return: 0.01 },
      { year: 2012, return: 0.14 },
      { year: 2013, return: 0.33 },
      { year: 2014, return: 0.12 },
      { year: 2015, return: 0.03 },
      { year: 2016, return: 0.11 },
      { year: 2017, return: 0.19 },
      { year: 2018, return: -0.05 },
      { year: 2019, return: 0.30 },
      { year: 2020, return: 0.21 },
      { year: 2021, return: 0.25 },
      { year: 2022, return: -0.19 },
      { year: 2023, return: 0.13 },
    ]
  },
  { name: "신흥국 ETF", symbol: "VWO", avgReturn: 0.07, description: "신흥국 시장",
    yearlyReturns: [
      { year: 2004, return: 0.12 },
      { year: 2005, return: 0.08 },
      { year: 2006, return: 0.18 },
      { year: 2007, return: 0.09 },
      { year: 2008, return: -0.42 },
      { year: 2009, return: 0.36 },
      { year: 2010, return: 0.13 },
      { year: 2011, return: -0.02 },
      { year: 2012, return: 0.10 },
      { year: 2013, return: 0.22 },
      { year: 2014, return: 0.09 },
      { year: 2015, return: -0.04 },
      { year: 2016, return: 0.07 },
      { year: 2017, return: 0.15 },
      { year: 2018, return: -0.15 },
      { year: 2019, return: 0.18 },
      { year: 2020, return: 0.15 },
      { year: 2021, return: -0.03 },
      { year: 2022, return: -0.22 },
      { year: 2023, return: 0.09 },
    ]
  },
  { name: "리얼 에스테이트 ETF", symbol: "VNQ", avgReturn: 0.09, description: "부동산 투자 신탁",
    yearlyReturns: [
      { year: 2004, return: 0.11 },
      { year: 2005, return: 0.07 },
      { year: 2006, return: 0.17 },
      { year: 2007, return: 0.08 },
      { year: 2008, return: -0.38 },
      { year: 2009, return: 0.32 },
      { year: 2010, return: 0.10 },
      { year: 2011, return: 0.00 },
      { year: 2012, return: 0.12 },
      { year: 2013, return: 0.28 },
      { year: 2014, return: 0.10 },
      { year: 2015, return: 0.02 },
      { year: 2016, return: 0.08 },
      { year: 2017, return: 0.05 },
      { year: 2018, return: -0.05 },
      { year: 2019, return: 0.28 },
      { year: 2020, return: -0.05 },
      { year: 2021, return: 0.36 },
      { year: 2022, return: -0.26 },
      { year: 2023, return: 0.11 },
    ]
  }
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
    setTimeout(() => {
      const monthlyRate = selectedETF.avgReturn / 12;
      const totalMonths = investmentPeriod * 12;
      let currentAmount = initialAmount / exchangeRate; // 원화→달러 환산
      const assetsOverTime: { year: number; amount: number }[] = [];
      assetsOverTime.push({ year: 0, amount: initialAmount });
      for (let month = 1; month <= totalMonths; month++) {
        currentAmount = (currentAmount + monthlyAmount / exchangeRate) * (1 + monthlyRate);
        if (month % 12 === 0) {
          assetsOverTime.push({
            year: month / 12,
            amount: parseFloat((currentAmount * exchangeRate).toFixed(2)) // 다시 원화로 환산
          });
        }
      }
      const totalInvested = initialAmount + (monthlyAmount * totalMonths);
      const totalReturn = assetsOverTime[assetsOverTime.length-1].amount - totalInvested;
      const cagr = Math.pow(assetsOverTime[assetsOverTime.length-1].amount / initialAmount, 1 / investmentPeriod) - 1;
      setResult({
        finalAmount: assetsOverTime[assetsOverTime.length-1].amount,
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
        {/* 환율 입력 및 fetch */}
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">USD/KRW 환율</span>
            <input
              type="number"
              value={exchangeRate}
              onChange={e => setExchangeRate(Number(e.target.value))}
              className="border rounded px-2 py-1 w-24 text-right"
              min={1}
              step={0.01}
            />
            <Button size="sm" onClick={fetchExchangeRate} disabled={isFetchingRate}>
              {isFetchingRate ? "불러오는 중..." : "최신 환율 적용"}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground pl-1">
            <span>
              환율 정보: {exchangeRate}원
              {exchangeRateTime ? ` ( ${exchangeRateTime} )` : ''}
            </span>
          </div>
        </div>
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
                  yearlyReturns?: { year: number; return: number }[];
                }

                interface ETFResult {
                  finalAmount: number;
                  totalInvested: number;
                  totalReturn: number;
                  cagr: number;
                  assetsOverTime: { year: number; amount: number }[];
                }

                export default function ETFSimPage() {
                  // 연도별 실제 수익률 mock 데이터 추가
                  const etfOptions: ETFData[] = [
                    { name: "S&P 500 ETF", symbol: "SPY", avgReturn: 0.10, description: "미국 대형주 500개 기업",
                      yearlyReturns: [
                        { year: 2004, return: 0.10 },
                        { year: 2005, return: 0.05 },
                        { year: 2006, return: 0.16 },
                        { year: 2007, return: 0.05 },
                        { year: 2008, return: -0.37 },
                        { year: 2009, return: 0.26 },
                        { year: 2010, return: 0.15 },
                        { year: 2011, return: 0.02 },
                        { year: 2012, return: 0.16 },
                        { year: 2013, return: 0.32 },
                        { year: 2014, return: 0.13 },
                        { year: 2015, return: 0.01 },
                        { year: 2016, return: 0.12 },
                        { year: 2017, return: 0.21 },
                        { year: 2018, return: -0.04 },
                        { year: 2019, return: 0.31 },
                        { year: 2020, return: 0.18 },
                        { year: 2021, return: 0.28 },
                        { year: 2022, return: -0.18 },
                        { year: 2023, return: 0.15 },
                      ]
                    },
                    { name: "나스닥 ETF", symbol: "QQQ", avgReturn: 0.12, description: "나스닥 100 기술주",
                      yearlyReturns: [
                        { year: 2004, return: 0.08 },
                        { year: 2005, return: 0.02 },
                        { year: 2006, return: 0.07 },
                        { year: 2007, return: 0.11 },
                        { year: 2008, return: -0.41 },
                        { year: 2009, return: 0.54 },
                        { year: 2010, return: 0.19 },
                        { year: 2011, return: 0.03 },
                        { year: 2012, return: 0.18 },
                        { year: 2013, return: 0.37 },
                        { year: 2014, return: 0.19 },
                        { year: 2015, return: 0.09 },
                        { year: 2016, return: 0.07 },
                        { year: 2017, return: 0.32 },
                        { year: 2018, return: -0.01 },
                        { year: 2019, return: 0.39 },
                        { year: 2020, return: 0.48 },
                        { year: 2021, return: 0.27 },
                        { year: 2022, return: -0.33 },
                        { year: 2023, return: 0.54 },
                      ]
                    },
                    { name: "전세계 주식 ETF", symbol: "VTI", avgReturn: 0.08, description: "전세계 분산 투자",
                      yearlyReturns: [
                        { year: 2004, return: 0.09 },
                        { year: 2005, return: 0.06 },
                        { year: 2006, return: 0.15 },
                        { year: 2007, return: 0.06 },
                        { year: 2008, return: -0.37 },
                        { year: 2009, return: 0.28 },
                        { year: 2010, return: 0.17 },
                        { year: 2011, return: 0.01 },
                        { year: 2012, return: 0.14 },
                        { year: 2013, return: 0.33 },
                        { year: 2014, return: 0.12 },
                        { year: 2015, return: 0.03 },
                        { year: 2016, return: 0.11 },
                        { year: 2017, return: 0.19 },
                        { year: 2018, return: -0.05 },
                        { year: 2019, return: 0.30 },
                        { year: 2020, return: 0.21 },
                        { year: 2021, return: 0.25 },
                        { year: 2022, return: -0.19 },
                        { year: 2023, return: 0.13 },
                      ]
                    },
                    { name: "신흥국 ETF", symbol: "VWO", avgReturn: 0.07, description: "신흥국 시장",
                      yearlyReturns: [
                        { year: 2004, return: 0.12 },
                        { year: 2005, return: 0.08 },
                        { year: 2006, return: 0.18 },
                        { year: 2007, return: 0.09 },
                        { year: 2008, return: -0.42 },
                        { year: 2009, return: 0.36 },
                        { year: 2010, return: 0.13 },
                        { year: 2011, return: -0.02 },
                        { year: 2012, return: 0.10 },
                        { year: 2013, return: 0.22 },
                        { year: 2014, return: 0.09 },
                        { year: 2015, return: -0.04 },
                        { year: 2016, return: 0.07 },
                        { year: 2017, return: 0.15 },
                        { year: 2018, return: -0.15 },
                        { year: 2019, return: 0.18 },
                        { year: 2020, return: 0.15 },
                        { year: 2021, return: -0.03 },
                        { year: 2022, return: -0.22 },
                        { year: 2023, return: 0.09 },
                      ]
                    },
                    { name: "리얼 에스테이트 ETF", symbol: "VNQ", avgReturn: 0.09, description: "부동산 투자 신탁",
                      yearlyReturns: [
                        { year: 2004, return: 0.11 },
                        { year: 2005, return: 0.07 },
                        { year: 2006, return: 0.17 },
                        { year: 2007, return: 0.08 },
                        { year: 2008, return: -0.38 },
                        { year: 2009, return: 0.32 },
                        { year: 2010, return: 0.10 },
                        { year: 2011, return: 0.00 },
                        { year: 2012, return: 0.12 },
                        { year: 2013, return: 0.28 },
                        { year: 2014, return: 0.10 },
                        { year: 2015, return: 0.02 },
                        { year: 2016, return: 0.08 },
                        { year: 2017, return: 0.05 },
                        { year: 2018, return: -0.05 },
                        { year: 2019, return: 0.28 },
                        { year: 2020, return: -0.05 },
                        { year: 2021, return: 0.36 },
                        { year: 2022, return: -0.26 },
                        { year: 2023, return: 0.11 },
                      ]
                    }
                  ];

                  const [exchangeRate, setExchangeRate] = useState<number>(1350); // 기본값: 1350원/USD
                  const [isFetchingRate, setIsFetchingRate] = useState(false);
                  const [exchangeRateTime, setExchangeRateTime] = useState<string>("");
                  const fetchExchangeRate = async () => {
                    setIsFetchingRate(true);
                    try {
                      const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=KRW');
                      const data = await res.json();
                      if (data && data.rates && data.rates.KRW) {
                        setExchangeRate(data.rates.KRW);
                        if (data.date) {
                          setExchangeRateTime(data.date + ' 기준');
                        } else {
                          setExchangeRateTime('실시간 조회');
                        }
                      }
                    } catch (e) {
                      alert('환율 정보를 불러오지 못했습니다.');
                    } finally {
                      setIsFetchingRate(false);
                    }
                  };
import ChartGraph from '../ChartGraph'

export default function ChartGraphExample() {
  // todo: remove mock functionality 
  const mockData = [
    { age: 25, assets: 65000000 },
    { age: 30, assets: 195000000 },
    { age: 35, assets: 390000000 },
    { age: 40, assets: 650000000 },
    { age: 45, assets: 975000000 },
    { age: 50, assets: 1300000000 },
  ];

  return (
    <div className="p-6 bg-background">
      <ChartGraph
        data={mockData}
        title="자산 성장 시뮬레이션"
        labelKey="age"
        valueKey="assets"
        xAxisLabel="나이"
        yAxisLabel="자산 (원)"
      />
    </div>
  );
}
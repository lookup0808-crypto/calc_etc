import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  [key: string]: any;
}

interface ChartGraphProps {
  data: ChartData[];
  title: string;
  labelKey: string;
  valueKey: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export default function ChartGraph({ 
  data, 
  title, 
  labelKey, 
  valueKey, 
  yAxisLabel = "", 
  xAxisLabel = "" 
}: ChartGraphProps) {
  const chartData = {
    labels: data.map(d => d[labelKey]),
    datasets: [
      {
        label: title,
        data: data.map(d => d[valueKey]),
        fill: false,
        borderColor: "hsl(15, 85%, 60%)",
        backgroundColor: "hsl(15, 85%, 60%)",
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'hsl(var(--foreground))',
          font: {
            family: 'Inter, Noto Sans KR',
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: 'hsl(var(--foreground))',
        font: {
          family: 'Inter, Noto Sans KR',
          size: 16,
          weight: 600,
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
          color: 'hsl(var(--muted-foreground))',
          font: {
            family: 'Inter, Noto Sans KR',
          }
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            family: 'Inter, Noto Sans KR',
          }
        },
        grid: {
          color: 'hsl(var(--border))',
        }
      },
      y: {
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          color: 'hsl(var(--muted-foreground))',
          font: {
            family: 'Inter, Noto Sans KR',
          }
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            family: 'Inter, Noto Sans KR',
          },
          callback: function(value: any) {
            return new Intl.NumberFormat('ko-KR').format(value);
          }
        },
        grid: {
          color: 'hsl(var(--border))',
        }
      }
    }
  };

  return (
    <div className="w-full" data-testid="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}
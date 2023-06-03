import type { AreaConfig } from '@ant-design/charts';
import { Area } from '@ant-design/charts';
import { useChartsConfig } from '@/hooks/web/antCharts/useChartsConfig';

export default function AreaChart({ data }: { data: {}[] }) {
  const { theme } = useChartsConfig();
  const config: Partial<AreaConfig> = {
    theme,
    height: 362,
    xField: 'week',
    yField: 'value',
    seriesField: 'category',
    smooth: true,
    legend: false,
    xAxis: {
      range: [0, 1],
      nice: true,
      grid: {
        alignTick: true,
        line: {
          style: {
            stroke: '#ddd',
            opacity: 0.5,
          },
        },
      },
    },
    yAxis: {
      nice: true,
      tickCount: 7,
      min: 0,
      max: 10,
      grid: {
        alignTick: true,
        line: {
          style: {
            stroke: '#ddd',
            opacity: 0.5,
          },
        },
      },
    },
  };
  if (!data) return <div></div>;
  return <Area {...config} data={data} />;
}

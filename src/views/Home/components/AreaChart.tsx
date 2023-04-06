import { memo } from 'react';
import type { AreaConfig } from '@ant-design/charts';
import { Area } from '@ant-design/charts';
import { useChartsConfig } from '@/hooks/web/antCharts/useChartsConfig';

const data = [
  {
    week: 'Sunday',
    value: 150,
    category: '目标任务',
  },
  {
    week: 'Monday',
    value: 154,
    category: '目标任务',
  },
  {
    week: 'Tuesday',
    value: 201,
    category: '目标任务',
  },
  {
    week: 'Wednesday',
    value: 299,
    category: '目标任务',
  },
  {
    week: 'Thursday',
    value: 190,
    category: '目标任务',
  },
  {
    week: 'Friday',
    value: 330,
    category: '目标任务',
  },
  {
    week: 'Saturday',
    value: 410,
    category: '目标任务',
  },
  {
    week: 'Sunday',
    value: 220,
    category: '事项',
  },
  {
    week: 'Monday',
    value: 182,
    category: '事项',
  },
  {
    week: 'Tuesday',
    value: 191,
    category: '事项',
  },
  {
    week: 'Wednesday',
    value: 234,
    category: '事项',
  },
  {
    week: 'Thursday',
    value: 290,
    category: '事项',
  },
  {
    week: 'Friday',
    value: 330,
    category: '事项',
  },
  {
    week: 'Saturday',
    value: 310,
    category: '事项',
  },
  {
    week: 'Sunday',
    value: 50,
    category: '任务',
  },
  {
    week: 'Monday',
    value: 124,
    category: '任务',
  },
  {
    week: 'Tuesday',
    value: 191,
    category: '任务',
  },
  {
    week: 'Wednesday',
    value: 280,
    category: '任务',
  },
  {
    week: 'Thursday',
    value: 90,
    category: '任务',
  },
  {
    week: 'Friday',
    value: 30,
    category: '任务',
  },
  {
    week: 'Saturday',
    value: 10,
    category: '任务',
  },
];

const AreaChart = memo(() => {
  const { theme } = useChartsConfig();
  const config: AreaConfig = {
    data,
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
      max: 1000,
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

  return <Area {...config} />;
});

export default AreaChart;

// 六种行为类别柱状图
import ReactECharts from 'echarts-for-react'

import { FrostedCard } from '~/components/FrostedCard'
import { behaviors } from '~/constants/behaviors.ts'
import { useClassVisionData } from '~/providers/ClassVisionProvider'

export default function BehaviorBarChart({ ...props }) {
  const { countsNow } = useClassVisionData()

  const option = {
    grid: {
      top: '0%',
      left: '5%',
      right: '10%',
      bottom: '10%',
    },
    xAxis: {
      type: 'value',
      axisLine: { show: true },
      axisTick: { show: false },
      axisLabel: { color: '#000' },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: behaviors.map(d => d.name),
      inverse: true,
      axisLabel: { color: '#000', fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: behaviors.map(d => ({
          value: countsNow[d.label as keyof typeof countsNow] ?? 0,
          itemStyle: { color: d.color },
        })),
        barWidth: 20,
        barCategoryGap: '20%',
        label: {
          show: true,
          position: 'right',
          color: '#000',
          fontSize: 12,
        },
        animationDuration: 100,
        animationEasing: 'cubicOut',
      },
    ],
  }

  return (
    <FrostedCard title="学生行为类别统计" {...props}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
    </FrostedCard>
  )
}

// 六种行为类别柱状图
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

import { FrostedCard } from '~/components/FrostedCard'
import type { BehaviorNode } from '~/constants/behaviors.ts'
import { behaviors } from '~/constants/behaviors.ts'

interface BehaviorData extends BehaviorNode {
  value: number
}

const initialData: BehaviorData[] = behaviors.map(b => ({
  name: b.name,
  label: b.label,
  description: b.description,
  color: b.color,
  value: 0,
}))

export function BehaviorBarChart({ ...props }) {
  const [data, setData] = useState(initialData)

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
      data: data.map(d => d.name),
      axisLabel: { color: '#000', fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: data.map(d => ({
          value: d.value,
          itemStyle: { color: d.color },
        })),
        barWidth: 20,
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

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map(d => ({
          ...d,
          value: Math.max(0, Math.round(d.value + (Math.random() * 6 - 3))),
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <FrostedCard title="学生行为类别统计" {...props}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
    </FrostedCard>
  )
}

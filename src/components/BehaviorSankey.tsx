// 行为转移桑基图
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

import { FrostedCard } from '~/components/FrostedCard'
import { behaviors } from '~/constants/behaviors.ts'

interface SankeyData {
  source: string
  target: string
  value: number
}

export function BehaviorSankey({ ...props }) {
  const [links, setLinks] = useState<SankeyData[]>([])

  const generateRandomData = (): SankeyData[] => {
    const result: SankeyData[] = []
    behaviors.forEach((b1) => {
      behaviors.forEach((b2) => {
        const val = Math.max(0, Math.round(Math.random() * 10 - 2))
        if (val > 0)
          result.push({ source: `前一分钟-${b1.name}`, target: `当前-${b2.name}`, value: val })
      })
    })
    return result
  }

  useEffect(() => {
    setLinks(generateRandomData())
    const interval = setInterval(() => setLinks(generateRandomData()), 1000)
    return () => clearInterval(interval)
  }, [])

  // 固定节点位置配置
  const leftX = 0.05
  const rightX = 0.95
  const topMargin = 0.08
  const bottomMargin = 0.08
  const n = behaviors.length
  const dataNodes = behaviors.flatMap((b, idx) => {
    const y = n > 1
      ? topMargin + (1 - topMargin - bottomMargin) * (idx / (n - 1))
      : 0.5
    return [
      { name: `前一分钟-${b.name}`, itemStyle: { color: b.color }, x: leftX, y },
      { name: `当前-${b.name}`, itemStyle: { color: b.color }, x: rightX, y },
    ]
  })

  const option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(255,255,255,0.7)',
      textStyle: { color: '#000' },
      formatter: (p: any) => {
        if (p.dataType === 'edge') {
          return `${p.data.source} → ${p.data.target}<br/>人数: ${p.data.value}`
        }
        return p.name
      },
    },
    series: [
      {
        type: 'sankey',
        layout: 'none', // 必需：使用手动坐标
        emphasis: { focus: 'adjacency' },
        nodeAlign: 'justify',
        draggable: false,
        lineStyle: {
          color: 'gradient',
          opacity: 0.6,
        },
        data: dataNodes,
        links,
        animationDuration: 100,
        animationEasing: 'cubicOut',
      },
    ],
  }

  return (
    <FrostedCard title="学生行为转移桑基图" {...props}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
    </FrostedCard>
  )
}

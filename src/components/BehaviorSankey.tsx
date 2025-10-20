// 行为转移桑基图
import ReactECharts from 'echarts-for-react'

import { FrostedCard } from '~/components/FrostedCard'
import { behaviors } from '~/constants/behaviors.ts'
import { useClassVisionData } from '~/providers/ClassVisionProvider'

export default function BehaviorSankey({ ...props }) {
  const { sankeyLinksMinuteAgoToNow } = useClassVisionData()

  // 固定节点位置配置（左右两列，顺序按 behaviors 常量）
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
        layout: 'none', // 使用手动坐标
        emphasis: { focus: 'adjacency' },
        nodeAlign: 'justify',
        draggable: false,
        layoutIterations: 0,
        lineStyle: {
          color: 'gradient',
          opacity: 0.6,
        },
        data: dataNodes,
        // 使用 Provider 计算得到的一分钟前 -> 当前 的流向
        links: sankeyLinksMinuteAgoToNow,
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

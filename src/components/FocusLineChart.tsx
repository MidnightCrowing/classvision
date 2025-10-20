// 专注度折线图
import ReactECharts from 'echarts-for-react'
import { renderToStaticMarkup } from 'react-dom/server'

import { FrostedCard } from '~/components/FrostedCard'
import { useClassVisionData } from '~/providers/ClassVisionProvider'

function TooltipRow({ color, name, value }: { color: string, name: string, value: number }) {
  return (
    <div whitespace-nowrap lh="1.4em">
      <span
        inline-flex
        rounded-full
        mr="6px"
        w="9px"
        h="9px"
        align-middle
        style={{ backgroundColor: color }}
      />
      <span align-middle>
        {name}
        :
        {Math.round(value)}
        人
      </span>
    </div>
  )
}

export default function FocusLineChart({ ...props }) {
  const { focusSeriesLastMinute } = useClassVisionData()

  const times = focusSeriesLastMinute.map(d => d.time)
  const high = focusSeriesLastMinute.map(d => d.HighlyFocused)
  const mid = focusSeriesLastMinute.map(d => d.ModeratelyFocused)
  const low = focusSeriesLastMinute.map(d => d.LowFocused)

  const option = {
    grid: {
      top: '0%',
      left: '3%',
      right: '3%',
      bottom: '23%',
    },
    color: ['#6AFF67', '#FFD966', '#FF6C6C'],
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const axisValue = params?.[0]?.axisValue ?? ''
        const rowsHtml = params
          .map((item: any) =>
            renderToStaticMarkup(
              <TooltipRow color={item.color} name={item.seriesName} value={item.data} />,
            ),
          )
          .join('')
        return `<div text="12px" lh="1.4em">${axisValue}<br/>${rowsHtml}</div>`
      },
    },
    legend: {
      data: ['高度专注', '一般专注', '注意力低'],
      textStyle: { color: '#000' },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: times,
      axisLabel: { color: '#000' },
      axisLine: { lineStyle: { color: '#999' } },
    },
    yAxis: {
      type: 'value',
      name: '人数',
      min: 0,
      axisLabel: { color: '#000' },
      axisLine: { lineStyle: { color: '#999' } },
    },
    series: [
      {
        name: '高度专注',
        type: 'line',
        data: high,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#6AFF67', width: 3 },
        areaStyle: { color: 'rgba(106, 255, 103, 0.3)' },
      },
      {
        name: '一般专注',
        type: 'line',
        data: mid,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#FFD966', width: 3 },
        areaStyle: { color: 'rgba(255, 217, 102, 0.3)' },
      },
      {
        name: '注意力低',
        type: 'line',
        data: low,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#FF6C6C', width: 3 },
        areaStyle: { color: 'rgba(255, 108, 108, 0.3)' },
      },
    ],
    animationDuration: 100,
    animationEasing: 'cubicOut',
  }

  return (
    <FrostedCard
      title="专注度人数折线图"
      {...props}
    >
      <ReactECharts option={option} notMerge={true} lazyUpdate={true} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
    </FrostedCard>
  )
}

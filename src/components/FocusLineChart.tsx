// 专注度折线图
import ReactECharts from 'echarts-for-react'
import { useEffect, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { FrostedCard } from '~/components/FrostedCard'

interface FocusData {
  time: string
  highlyFocused: number
  moderatelyFocused: number
  lowFocused: number
}

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

export function FocusLineChart({ ...props }) {
  const [data, setData] = useState<FocusData[]>([])
  const lastValues = useRef({ highlyFocused: 0, moderatelyFocused: 0, lowFocused: 0 })

  // 初始化 60s 空数据
  useEffect(() => {
    const now = Date.now()
    const initData = Array.from({ length: 60 }, (_, i) => ({
      time: new Date(now - (59 - i) * 1000).toLocaleTimeString('zh-CN', {
        minute: '2-digit',
        second: '2-digit',
      }),
      highlyFocused: 0,
      moderatelyFocused: 0,
      lowFocused: 0,
    }))
    setData(initData)
  }, [])

  // 模拟 WebSocket 数据流（每秒更新）
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString('zh-CN', {
        minute: '2-digit',
        second: '2-digit',
      })

      // 模拟随机人数变化（例如总人数在 0-20 之间波动）
      const newValues = {
        highlyFocused: Math.max(0, Math.min(20, lastValues.current.highlyFocused + (Math.random() * 4 - 2))),
        moderatelyFocused: Math.max(0, Math.min(20, lastValues.current.moderatelyFocused + (Math.random() * 4 - 2))),
        lowFocused: Math.max(0, Math.min(20, lastValues.current.lowFocused + (Math.random() * 4 - 2))),
      }

      lastValues.current = newValues

      setData((prev) => {
        const newData = [...prev.slice(1), { time: newTime, ...newValues }]
        return newData
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
      data: data.map(d => d.time),
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
        data: data.map(d => d.highlyFocused),
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#6AFF67', width: 3 },
        areaStyle: { color: 'rgba(106, 255, 103, 0.3)' },
      },
      {
        name: '一般专注',
        type: 'line',
        data: data.map(d => d.moderatelyFocused),
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#FFD966', width: 3 },
        areaStyle: { color: 'rgba(255, 217, 102, 0.3)' },
      },
      {
        name: '注意力低',
        type: 'line',
        data: data.map(d => d.lowFocused),
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

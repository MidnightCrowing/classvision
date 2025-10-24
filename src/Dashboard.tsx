import { lazy } from 'react'

import { ThemeToggle } from '~/components/ThemeToggle'

const AttentionHeatmap = lazy(() => import('~/components/AttentionHeatmap.tsx'))
const BehaviorBarChart = lazy(() => import('~/components/BehaviorBarChart.tsx'))
const BehaviorSankey = lazy(() => import('~/components/BehaviorSankey.tsx'))
const FocusLabel = lazy(() => import('~/components/FocusLabel.tsx'))
const FocusLineChart = lazy(() => import('~/components/FocusLineChart.tsx'))
const ProcessedVideo = lazy(() => import('~/components/ProcessedVideo.tsx'))
const YoloOutputTable = lazy(() => import('~/components/Yolo0utputTable.tsx'))

export function Dashboard() {
  return (
    <div
      bg="[linear-gradient(135deg,_#f5f8ff_0%,_#eaf2ff_100%)]"
      dark:bg="[linear-gradient(135deg,_#0c111b_0%,_#0b1220_100%)]"
      size-full
    >
      <ThemeToggle />
      {/* center module */}
      <ProcessedVideo
        absolute
        pos="top-5px left-50%"
        translate-x="-1/2"
        z="0"
        w="3/4"
      />

      {/* left sidebar */}
      <div
        className="frosted-card no-hover"
        absolute
        w="$sidebar-width"
        max-w="45%"
        box-border
        pos="left-10px top-5px bottom-8px"
        z="2"
        flex="~ col"
        gap="10px"
      >
        <AttentionHeatmap />
        <FocusLabel grow />
        <FocusLineChart h="53%" />
      </div>

      {/* right sidebar */}
      <div
        className="frosted-card no-hover"
        absolute
        w="$sidebar-width"
        max-w="45%"
        box-border
        pos="right-10px top-5px bottom-8px"
        z="2"
        flex="~ col justify-between"
      >
        <BehaviorBarChart h="40%" />
        <BehaviorSankey h="53%" />
      </div>

      {/* bottom sidebar */}
      <div
        className="frosted-card no-hover"
        absolute
        h="$sidebar-height"
        max-h="95%"
        pos="bottom-8px left-[calc(var(--sidebar-width)+20px)] right-[calc(var(--sidebar-width)+20px)]"
        z="1"
        flex="~ col justify-between"
      >
        <YoloOutputTable />
      </div>
    </div>
  )
}

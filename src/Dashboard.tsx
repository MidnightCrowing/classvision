import { AttentionHeatmap } from '~/components/AttentionHeatmap.tsx'
import { BehaviorBarChart } from '~/components/BehaviorBarChart.tsx'
import { BehaviorSankey } from '~/components/BehaviorSankey.tsx'
import { FocusLabel } from '~/components/FocusLabel.tsx'
import { FocusLineChart } from '~/components/FocusLineChart.tsx'
import { ProcessedVideo } from '~/components/ProcessedVideo.tsx'
import { YoloOutputTable } from '~/components/Yolo0utputTable.tsx'

export function Dashboard() {
  return (
    <div
      bg="[linear-gradient(135deg,_#f5f8ff_0%,_#eaf2ff_100%)]"
      size-full
    >
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
        z="1"
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
        z="1"
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

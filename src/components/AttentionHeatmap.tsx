// 注意力热力图
import { Video } from '@fluentui/react-migration-v0-v9'

import video from '~/assets/input.mp4'
import { FrostedCard } from '~/components/FrostedCard'

export function AttentionHeatmap({ className, ...props }: { className?: string }) {
  return (
    <div className={className} {...props}>
      <FrostedCard title="注意力热力图">
        <Video
          className="aspect-video w-full"
          src={video}
          autoPlay
          controls={false}
        />
      </FrostedCard>
    </div>
  )
}

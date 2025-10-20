// 模型处理后的视频
import type { JSXElement } from '@fluentui/react-components'
import { Video } from '@fluentui/react-migration-v0-v9'
import type { HTMLAttributes } from 'react'

import video from '~/assets/output.mp4'

type ProcessedVideoProps = {
  className?: string
  absolute?: boolean
  pos?: string
  'translate-x'?: string
  z?: string
  w?: string
} & HTMLAttributes<HTMLDivElement>

export default function ProcessedVideo({ className, ...props }: ProcessedVideoProps): JSXElement {
  return (
    <div className={className} {...props}>
      <Video
        className="aspect-video w-full"
        src={video}
        autoPlay
        controls={false}
      />
    </div>
  )
}

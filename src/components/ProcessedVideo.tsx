// 模型处理后的视频

import type { JSXElement } from '@fluentui/react-components'
import { Video } from '@fluentui/react-migration-v0-v9'

import video from '~/assets/output.mp4'

export function ProcessedVideo({ className, ...props }: { className?: string }): JSXElement {
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

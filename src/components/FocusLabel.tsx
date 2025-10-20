// 专注度
import { FocusLabelCard } from '~/components/FocusLabelCard.tsx'
import { FrostedCard } from '~/components/FrostedCard'
import { useClassVisionData } from '~/providers/ClassVisionProvider'

export default function FocusLabel({ ...props }) {
  const { focusNow } = useClassVisionData()

  return (
    <FrostedCard
      title="专注度人数统计"
      {...props}
    >
      <div h-full flex="~ row" gap="10px">
        <FocusLabelCard
          label="高度专注"
          value={String(focusNow.HighlyFocused)}
          bg="#6AFF67/50 hover:#6AFF67/80"
          grow
        />
        <FocusLabelCard
          label="一般专注"
          value={String(focusNow.ModeratelyFocused)}
          bg="#FFF375/50 hover:#FFF375/80"
          grow
        />
        <FocusLabelCard
          label="注意力低"
          value={String(focusNow.LowFocused)}
          bg="#FF6C6C/50 hover:#FF6C6C/80"
          grow
        />
      </div>
    </FrostedCard>
  )
}

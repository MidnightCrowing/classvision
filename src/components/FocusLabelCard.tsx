import type { HTMLAttributes } from 'react'

type FocusLabelCardProps = {
  label: string
  value: string
  bg?: string
  grow?: boolean
} & HTMLAttributes<HTMLDivElement>

export function FocusLabelCard({ label, value, ...props }: FocusLabelCardProps) {
  return (
    <div
      p="20px"
      flex="~ col items-start justify-center"
      gap="10px"
      truncate
      rounded-lg
      backdrop-blur-md
      shadow="md hover:lg"
      cursor-default
      transition="all 500 ease-in-out"
      {...props}
    >
      <div font-semibold mb-2>{label}</div>
      <div text-xl font-bold>{value}</div>
    </div>
  )
}

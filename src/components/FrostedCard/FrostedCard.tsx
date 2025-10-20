import './FrostedCard.scss'

import type { ReactNode } from 'react'

/**
 * FrostedCard 毛玻璃质感卡片组件
 */
export function FrostedCard({ title, children, className, ...props }: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`frosted-card ${className}`}
      flex="~ col"
      {...props}
    >
      {title && <div className="frosted-card-header">{title}</div>}
      <div className="frosted-card-body" grow>{children}</div>
    </div>
  )
}

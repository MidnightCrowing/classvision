import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type { ReactNode } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends Omit<AttributifyAttributes, 'icon'> {
    // 扩展 icon 属性，支持 ReactNode 和 UnoCSS 的字符串
    icon?: ReactNode | string
    absolute?: string | boolean
    appearance?: string
    duration?: string
    top?: string
    translate?: string
    height?: string
    object?: string
    left?: string
    aspect?: string
    delay?: string
    brightness?: string
    size?: string | number
    bg?: string
    grow?: boolean | string
    'whitespace-nowrap'?: boolean | string
    lh?: string
    pos?: string
    'translate-x'?: string
    z?: string
    w?: string
    // 允许任意额外属性（兼容更多 Attributify 写法 / 自定义属性）
    [key: string]: any
  }
}

// 允许在 JSKX 自定义组件上传任意 Attributify 属性
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      [key: string]: any
    }
  }

  // 补充缺失的类型，避免找不到名称
  type PresenceBadgeStatus = 'available' | 'away' | 'busy' | 'offline' | string
}

export {}

import { Switch } from '@fluentui/react-components'

import { useTheme } from '~/providers/ThemeProvider'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <div absolute pos="top-4 right-6" z="50">
      <Switch
        checked={isDark}
        onChange={toggle}
        label={isDark ? '暗色' : '亮色'}
      />
    </div>
  )
}

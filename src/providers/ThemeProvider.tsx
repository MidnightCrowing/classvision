import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components'
import type { ReactNode } from 'react'
import { createContext, use, useEffect, useLayoutEffect, useMemo, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  isDark: boolean
  setMode: (m: ThemeMode) => void
  toggle: () => void
  echartsTheme: 'dark' | undefined
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialMode(): ThemeMode {
  try {
    const stored = localStorage.getItem('theme') as ThemeMode | null
    if (stored === 'light' || stored === 'dark')
      return stored
  }
  catch {}

  if (typeof window !== 'undefined' && window.matchMedia)
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialMode())

  // reflect to <html class="dark"> and persist
  useLayoutEffect(() => {
    const root = document.documentElement
    if (mode === 'dark')
      root.classList.add('dark')
    else
      root.classList.remove('dark')

    try {
      localStorage.setItem('theme', mode)
    }
    catch {}
  }, [mode])

  // follow system if user has not chosen explicitly (optional enhancement)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme') as ThemeMode | null
      if (stored === 'light' || stored === 'dark')
        return

      setMode(e.matches ? 'dark' : 'light')
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    isDark: mode === 'dark',
    setMode,
    toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
    echartsTheme: mode === 'dark' ? 'dark' : undefined,
  }), [mode])

  return (
    <ThemeContext value={value}>
      <FluentProvider theme={mode === 'dark' ? webDarkTheme : webLightTheme}>
        {children}
      </FluentProvider>
    </ThemeContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = use(ThemeContext)
  if (!ctx)
    throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

import './styles'
import './lib/echartsTheme'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { ClassVisionProvider } from './providers/ClassVisionProvider'
import { ThemeProvider } from './providers/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ClassVisionProvider>
        <App />
      </ClassVisionProvider>
    </ThemeProvider>
  </StrictMode>,
)

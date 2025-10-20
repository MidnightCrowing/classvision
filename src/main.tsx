import './styles'

import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { ClassVisionProvider } from './providers/ClassVisionProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <ClassVisionProvider>
        <App />
      </ClassVisionProvider>
    </FluentProvider>
  </StrictMode>,
)

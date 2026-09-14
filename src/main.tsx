import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { applyTheme, getInitialTheme } from './lib/theme'

// Apply the theme before first paint so there is no light-mode flash for
// users who saved dark mode (or whose system prefers it).
applyTheme(getInitialTheme(), false, false)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

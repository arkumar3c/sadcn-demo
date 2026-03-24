import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Vite sets BASE_URL with a trailing slash (e.g. `/sadcn-demo/`).
 * React Router's `basename` must NOT have a trailing slash.
 * Mismatch often yields a blank page on GitHub Pages.
 */
function routerBasename(): string | undefined {
  const raw = import.meta.env.BASE_URL
  if (raw === '/') return undefined
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

/** Set VITE_USE_HASH_ROUTER=1 if BrowserRouter still fails on your host (uses #/ routes). */
const useHashRouter = import.meta.env.VITE_USE_HASH_ROUTER === '1'
const Router = useHashRouter ? HashRouter : BrowserRouter
const routerProps = useHashRouter ? {} : { basename: routerBasename() }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Router {...routerProps}>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)

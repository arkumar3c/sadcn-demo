/* eslint-disable react-refresh/only-export-components -- entry file */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * GitHub Pages (and many static hosts) do not rewrite URLs to index.html for
 * client routes. BrowserRouter + basename often still yields a blank screen.
 * HashRouter uses #/ paths and avoids the server entirely — set
 * VITE_USE_HASH_ROUTER=0 to force BrowserRouter on a subpath (advanced).
 */
// const base = import.meta.env.BASE_URL
// const useHashRouter =
//   base !== '/' && import.meta.env.VITE_USE_HASH_ROUTER !== '0'

// function routerBasename(): string | undefined {
//   if (base === '/') return undefined
//   return base.endsWith('/') ? base.slice(0, -1) : base
// }

// const Router = useHashRouter ? HashRouter : BrowserRouter
// const routerProps = useHashRouter ? {} : { basename: routerBasename() }

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Missing #root element in index.html')
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <HashRouter>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </HashRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)

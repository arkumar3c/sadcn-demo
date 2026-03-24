import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projectDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
// Production: `base: './'` so JS/CSS/favicon resolve relative to index.html.
// This fixes 404s on GitHub Pages when absolute paths like `/sadcn-demo/assets/...`
// don't match how the site is actually hosted.
// Dev server keeps `base: '/'` so `/src/main.tsx` works as usual.
export default defineConfig(() => ({
  
  plugins: [react(), tailwindcss()],
  base: "/sadcn-demo/", 
  // Avoid ENOSPC when inotify max_user_watches is exhausted (common on Linux).
  server: { watch: { usePolling: true } },
  resolve: {
    alias: {
      '@': path.resolve(projectDir, 'src'),
    },
  },
}))

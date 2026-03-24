import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projectDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
// For GitHub Pages project sites, set when deploying: VITE_BASE_PATH=/your-repo-name/
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  // Avoid ENOSPC when inotify max_user_watches is exhausted (common on Linux).
  server: { watch: { usePolling: true } },
  resolve: {
    alias: {
      '@': path.resolve(projectDir, 'src'),
    },
  },
})

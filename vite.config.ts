import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { liveNewsPlugin } from './scripts/liveNewsVitePlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), liveNewsPlugin()],
  server: {
    watch: {
      ignored: ['**/scratch/**', '**/.tempmediaStorage/**', '**/chrome_*/**'],
    },
  },
})


import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { liveNewsPlugin } from './scripts/liveNewsVitePlugin.ts'
import { steamSalesPlugin } from './scripts/steamSalesVitePlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), liveNewsPlugin(), steamSalesPlugin()],
  server: {
    watch: {
      ignored: ['**/scratch/**', '**/.tempmediaStorage/**', '**/chrome_*/**'],
    },
  },
})


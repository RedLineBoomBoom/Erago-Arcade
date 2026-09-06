import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { liveNewsPlugin } from './scripts/liveNewsVitePlugin.ts'
import { steamSalesPlugin } from './scripts/steamSalesVitePlugin.ts'
import { presencePlugin } from './scripts/presenceVitePlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), liveNewsPlugin(), steamSalesPlugin(), presencePlugin()],
  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: ['**/scratch/**', '**/.tempmediaStorage/**', '**/chrome_*/**'],
    },
  },
  preview: {
    host: true,
    port: 5173,
  },
})



import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // base './' supaya hasil build bisa jalan di subfolder website pribadi
  base: './',
  plugins: [react()],
})

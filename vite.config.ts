import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: ["30476c36-2b2c-4437-a2d0-b3ed7c044e1d-00-3t334tha5scjn.sisko.replit.dev"],
  }
})

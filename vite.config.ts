import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: ['4fbd4f82-9024-4bc2-af7f-fa3716fc9a6e-00-170d09lu9ey5a.sisko.replit.dev'],
  }
})

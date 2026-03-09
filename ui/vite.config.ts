import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// TODO: Configure path aliases (e.g., '@' for 'src/') to avoid deep relative imports.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})

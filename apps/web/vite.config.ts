import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // absolute asset paths — required so deep SSG routes (e.g. /beaches/surf-city) load assets correctly
  resolve: {
    // Force a single React instance so deps like @vercel/analytics don't
    // resolve their own copy (causes "Invalid hook call" in the pnpm monorepo).
    dedupe: ['react', 'react-dom'],
  },
})

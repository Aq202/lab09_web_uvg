import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    include: ['**/*.test.jsx'],
    setupFiles: './src/setupTests.js',
    globals: true,
    environment: 'jsdom',

  },
})

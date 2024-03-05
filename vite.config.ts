import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import version from 'vite-plugin-package-version'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), version()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/vitest-setup.ts',
    css: true,
  },
})

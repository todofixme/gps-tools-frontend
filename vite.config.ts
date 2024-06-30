import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import version from 'vite-plugin-package-version'

const isTest = process.env.NODE_ENV === 'test'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), !isTest && TanStackRouterVite(), version()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/vitest-setup.ts',
    css: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,playwright}.config.*',
    ],
  },
})

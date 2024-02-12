import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import packageConfig from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(packageConfig.version),
  },
})

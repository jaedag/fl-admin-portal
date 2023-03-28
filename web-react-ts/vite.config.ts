import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import dns from 'dns'

// https://vitejs.dev/config/

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
})

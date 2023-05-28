import { defineConfig, loadEnv } from 'vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import dns from 'dns'

// https://vitejs.dev/config/

dns.setDefaultResultOrder('verbatim')

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const { loadSecrets } = require('./secrets.js')

  const secrets = loadSecrets()

  return {
    server: {
      open: true,
      port: 3000,
    },
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: 'first-love-center',
        project: 'fap-frontend-fix',

        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and need `project:releases` and `org:read` scopes
        authToken: secrets.SENTRY_AUTH_TOKEN,

        sourcemaps: {
          // Specify the directory containing build artifacts
          assets: './dist/**',
        },

        // Use the following option if you're on an SDK version lower than 7.47.0:
        // include: "./dist",

        // Optionally uncomment the line below to override automatic release name detection
        // release: env.RELEASE,
      }),
    ],
  }
})

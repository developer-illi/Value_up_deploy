import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { Connect } from 'vite'

const IGNORED_PATHS = ['/dev-sw.js', '/manifest.webmanifest', '/favicon.png', '/src/main.tsx', '/.well-known/', '/@vite-plugin-pwa/']

function ignoreNoisePaths(): { name: string; configureServer: (server: { middlewares: Connect.Server }) => void } {
  return {
    name: 'ignore-noise-paths',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        if (IGNORED_PATHS.some((p) => path === p || path.startsWith(p))) {
          res.statusCode = 404
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [ignoreNoisePaths(), tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
  build: {
    rollupOptions: {
      external: (id) => id === 'nodemailer' || id.startsWith('nodemailer/'),
    },
  },
})

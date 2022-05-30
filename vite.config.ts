import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import viteFastify from "fastify-vite/plugin";

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

import {
  getWebSideDefaultBabelConfig,
  getPaths,
  getConfig,
} from '@redwoodjs/internal'

import type { UserConfig } from 'vite'
import path from 'path'

const redwoodConfig = getConfig()
const redwoodPaths = getPaths()
const rwBabelConfig = getWebSideDefaultBabelConfig()

const viteConfig: UserConfig = {
  // @MARK so we can put stuff in the web folder
  root: 'web',
  resolve: {
    alias: {
      src: getPaths().web.src,
    },
  },
  plugins: [
    react({
      babel: {
        ...rwBabelConfig,
      },
    }),
    // viteFastify()
  ],
  // @MARK: try to customise tailwind/postcss config path. Ignores "root"
  css: {
    postcss: './web/config/',
  },
  server: {
    proxy: {
      //@MARK we need to do a check for absolute urls here
      [getConfig().web.apiUrl]: {
        target: 'http://localhost:8911',
        changeOrigin: true,
        // @MARK might be better to use a regex maybe
        rewrite: (path) => path.replace(getConfig().web.apiUrl, ''),
      },
    },
  },
  define: {
    // @MARK instead of using process.env, we use RWJS_GLOBALS
    // This is because it seems to interfere with the node polyfills in esbuildOptions
    RWJS_GLOBALS: {
      RWJS_API_GRAPHQL_URL:
        redwoodConfig.web.apiGraphQLUrl ??
        redwoodConfig.web.apiUrl + '/graphql',
      RWJS_API_DBAUTH_URL:
        redwoodConfig.web.apiDbAuthUrl ?? `${redwoodConfig.web.apiUrl}/auth`,
      RWJS_API_URL: redwoodConfig.web.apiUrl,
      __REDWOOD__APP_TITLE:
        redwoodConfig.web.title || path.basename(redwoodPaths.base),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
}

export default defineConfig(viteConfig)

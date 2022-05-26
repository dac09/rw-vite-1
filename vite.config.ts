import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import viteFastify from "fastify-vite/plugin";

import {getWebSideDefaultBabelConfig, getPaths, getConfig} from '@redwoodjs/internal'

import type { UserConfig } from "vite";
import path from "path";

const redwoodConfig = getConfig()
const redwoodPaths = getPaths()
const rwBabelConfig = getWebSideDefaultBabelConfig()

const viteConfig: UserConfig = {
  // @MARK so we can put stuff in the web folder
  root: "web",
  resolve: {
    alias: {
      'src': getPaths().web.src,
    },
  },
 plugins: [
    react({
      babel: {
        ...rwBabelConfig
      }
    }),
    // viteFastify()
  ],
  // @MARK: try to customise tailwind/postcss config path. Ignores "root"
  css: {
    postcss: "./web/config/",
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
    // @MARK we only do this because of how we loaded stuff using webpack
    // We can probably remove this, and just change how we assign it in
    // redwood/packages/web/src/config.ts
    'process.env': {
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
};

export default defineConfig(viteConfig);

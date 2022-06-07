import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import renderer from './renderer.mjs'

import rwInternal from '@redwoodjs/internal'

const server = Fastify()

// @MARK Fastify Vite doesn't respect globals settings from vite.config
// Raise a bug for this
globalThis.RWJS_GLOBALS = {}

// globalThis.__REDWOOD__PRERENDERING = true

// process.env.RWJS_ROUTES_USE_STATIC_IMPORTS = '1'

// Note that FastifyVite's root setting is different to Vite's root setting
const root = rwInternal.getPaths().base

await server.register(FastifyVite, {
  root,
  renderer,
  // @MARK: This is relative to the vite root (odd...), in this case web/
  // The vite root is set in vite.config.ts
  clientModule: 'infw/clientModule.js',
})

await server.vite.ready()
await server.listen(3000)

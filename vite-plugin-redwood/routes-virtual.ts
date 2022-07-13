import { getPaths } from '@redwoodjs/internal'
import { getProject } from '@redwoodjs/structure'

export const listRoutes = () => {
  const rwProject = getProject(getPaths().base)
  const routes = rwProject.getRouter().routes

  return routes.map((route: any) => ({
    name: route.isNotFound ? '404' : route.name,
    path: route.isNotFound ? '/404' : route.path,
    hasParams: route.hasParameters,
    id: route.id,
    isNotFound: route.isNotFound,
    filePath: route.page?.filePath,
  }))
}

type EmittedAsset = {
  type: 'asset'
  name?: string
  fileName?: string
  source?: string | Uint8Array
}

export default function virtualRoutes() {
  // @MARK this is the import specifier
  const virtualModuleId = 'virtual:redwood-routes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-redwood-routes', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      const myRoutes = listRoutes()

      // @MARK this can still be useful for SSR, where we don't want to bundle rwjs/internal and structure
      if (id === resolvedVirtualModuleId) {
        return `export const routes = ${JSON.stringify(
          myRoutes
        )}; export default routes;`
      }
    },
    // @MARK only called during build, because its a rollup hook: https://rollupjs.org/guide/en/#renderchunk
    // But I don't think we need this hook...
    renderChunk(_code, chunk, options) {
      if (chunk.isDynamicEntry) {
        console.log('-------------------')
        console.log(`Dynamic import: `, chunk.name)
        console.log('Output filename: ', chunk.fileName)
        console.log('Absolute path: ', chunk.facadeModuleId)
      }
    },
    generateBundle(outputOpts, bundle) {
      const myRoutesOutput: EmittedAsset = {
        type: 'asset',
        name: 'routes',
        fileName: 'assets/bazingaRoutes.js',
        source: JSON.stringify(bundle),
      }

      // @MARK we can either emit this file, or add whatever we need to the entrypoint
      // For SSR: maybe we ought to emit, so we can easily load it in the server. Alt: just use virtual module + manifest
      // For Prefetch: maybe add it to entrypoint RWJS_GLOBALS['routes'] = myRoutesOutput
      // The router can have util functions that lets you fetch the preload link
      this.emitFile(myRoutesOutput)
    },
  }
}

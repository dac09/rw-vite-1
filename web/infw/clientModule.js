// @MARK
// this is required at the moment for fastify-vite
// In theory we should be able to configure it to be inside the framework
// Not sure if we can rename this file, or move it into FW yet

import { createApp } from '../src/App'

// import { getPaths } from '@redwoodjs/internal'
// import { getProject } from '@redwoodjs/structure'

// export const routesJsToFastifySetup = () => {
//   const rwProject = getProject(getPaths().base)
//   const routes = rwProject.getRouter().routes

//   const fastifyRoutes = routes.map((route) => ({
//     name: route.isNotFound ? '404' : route.name,
//     path: route.isNotFound ? '/404' : route.path,
//     // hasParams: route.hasParameters,
//     // id: route.id,
//     // isNotFound: route.isNotFound,
//     // filePath: route.page?.filePath,
//   }))

//   return fastifyRoutes
// }

export default {
  // @MARK: routes tells fastify-vite what server side routes to register
  routes: [
    {
      path: '/',
    },
    {
      path: '/about',
    },
    {
      path: '/contact',
    },
    {
      path: '/404',
    },
  ],
  createApp,
}

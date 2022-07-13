import { createApp } from './App'
import ReactDOMServer from 'react-dom/server.node.js'

// @MARK: - Entry point for the server
// Just reusing createApp because its the same code
// I don't think we need to organise the code this way

// Perform SSR, i.e., turn app.instance into an HTML fragment
export const render = (ctx, url) =>
  ReactDOMServer.renderToString(createApp({}, url))

export default createApp

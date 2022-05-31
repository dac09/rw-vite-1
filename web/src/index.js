import ReactDOM from 'react-dom'

import { createApp } from './App'
/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://reactjs.org/docs/react-dom.html#hydrate
 */
const rootElement = document.getElementById('redwood-app')

ReactDOM.hydrate(createApp(window.hydration), rootElement)

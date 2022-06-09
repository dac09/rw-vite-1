import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from './Routes'

import { LocationProvider } from '@redwoodjs/router'

// @MARK
// Removed CSS imports, put it in index.html

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export const createApp = (ctx, url) => {
  if (!url) {
    return <App />
  }

  return (
    <LocationProvider
      location={{
        pathname: url,
      }}
      mode="static"
    >
      <App />
    </LocationProvider>
  )
}

export default App

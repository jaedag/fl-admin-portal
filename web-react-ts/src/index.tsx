import React, { useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import CacheBuster from 'CacheBuster'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import AppWithContext from 'AppWithContext'
import Login from 'components/Login'
import Sabbath from 'auth/Sabbath'
import ReactGA from 'react-ga4'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import SplashSreen from 'pages/splash-screen/SplashSreen'

const AppWithApollo = () => {
  const [accessToken, setAccessToken] = useState<String>()
  const { getAccessTokenSilently, isLoading, user } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://flcadmin.netlify.app/graphql',
        scope: 'read:current_user',
      })

      setAccessToken(token)
      sessionStorage.setItem('token', token)
    } catch (err) {
      // eslint-disable-next-line
      console.error('Error Obtaining Token', err)
    }
  }, [getAccessTokenSilently])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('token') || accessToken

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  })

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    if (theme === 'dark') document.body.style.backgroundColor = '#121212'
    else document.body.style.backgroundColor = '#FFFFFF'
  }, [theme])

  if (new Date().getDay() === 1 && new Date().getHours() > 4) {
    return <Sabbath />
  }

  if (isLoading) {
    return <SplashSreen />
  }

  if (!user) {
    return <Login />
  }

  return (
    <ApolloProvider client={client}>
      <AppWithContext themeOptions={{ theme, setTheme }} />
    </ApolloProvider>
  )
}

const AppWithAuth = () => (
  <CacheBuster>
    {({
      loading,
      isLatestVersion,
      refreshCacheAndReload,
    }: {
      loading: boolean
      isLatestVersion: boolean
      refreshCacheAndReload: () => void
    }) => {
      if (loading) return null
      if (!loading && !isLatestVersion) {
        refreshCacheAndReload()
      }

      return (
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
          redirectUri={window.location.origin}
          audience="https://flcadmin.netlify.app/graphql"
          scope="true"
        >
          <AppWithApollo />
        </Auth0Provider>
      )
    }}
  </CacheBuster>
)

ReactGA.initialize('G-BT4M7RYZX0')
ReactGA.send('pageview')
Sentry.init({
  dsn: 'https://a6fccd390f7a4cdfa48da901b0e2e22f@o1423098.ingest.sentry.io/6770463',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const container: HTMLElement =
  document.getElementById('root') || document.createElement('div')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AppWithAuth />
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

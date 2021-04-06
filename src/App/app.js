import React, {Suspense, useEffect, useLayoutEffect} from 'react'

import {useWindowWidth} from '@react-hook/window-size'
import {KeycloakProvider} from '@react-keycloak/web'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import ErrorBoundary from '../App/errorBoundary'
import Dashboard from '../Dashboard/dashboard'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import keycloak from '../keycloak'
import Navigation from '../Navigation/navigation'
import {Box} from '../Primitives'
import breakpoints from '../Theme/breakpoints'
import Global from '../Theme/global'
import theme from '../Theme/theme'
import Spinner from './spinner'
import {useAppStore} from './stores'
import SWRProvider from './swrProvider'

const App = () => {
  const [isDark, setWindowWidth, setIsDesktop] = useAppStore((state) => [
    state.isDark,
    state.setWindowWidth,
    state.setIsDesktop,
  ])
  const windowWidth = useWindowWidth()

  useLayoutEffect(() => {
    setWindowWidth(windowWidth)
    setIsDesktop(windowWidth > parseInt(breakpoints[1]) * 16)
  }, [windowWidth, setWindowWidth, setIsDesktop])

  return (
    <KeycloakProvider keycloak={keycloak} initConfig={{pkceMethod: 'S256'}}>
      <SWRProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme(isDark)}>
            <Global />
            <Box as="nav" sx={{position: 'sticky', top: 0, mb: [4, 5]}}>
              <Navigation />
            </Box>
            <Box mx={[4, 4, 4, 5]}>
              <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                  <Route exact path="/" component={DocumentsPage} />
                  <Route exact path="/documents" component={DocumentsPage} />
                  <Route
                    exact
                    path="/documents/:documentId"
                    component={DocumentPage}
                  />
                  <Route path="/dashboard" component={Dashboard} />
                </Suspense>
              </ErrorBoundary>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </SWRProvider>
    </KeycloakProvider>
  )
}

export default App

import React, {Suspense} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {Route} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import ErrorBoundary from '../App/errorBoundary'
import Dashboard from '../Dashboard/dashboard'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import Navigation from '../Navigation/navigation'
import {Box} from '../Primitives'
import Global from '../Theme/global'
import theme from '../Theme/theme'
import Spinner from './spinner'
import {useThemeStore} from './stores'

const App = () => {
  const isDark = useThemeStore(state => state.isDark)
  const {initialized} = useKeycloak()
  return (
    <ThemeProvider theme={theme(isDark)}>
      <Global />
      <Box as="nav" sx={{position: 'sticky', top: 0, mb: [4, 5]}}>
        <Navigation />
      </Box>
      {initialized && (
        <Box mx={[1, 2, 3, 4]}>
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
      )}
    </ThemeProvider>
  )
}

export default App

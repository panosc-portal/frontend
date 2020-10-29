import React, {Suspense, useContext} from 'react'

import styled from '@emotion/styled'
import {useKeycloak} from '@react-keycloak/web'
import css from '@styled-system/css'
import {ThemeProvider} from 'emotion-theming'
import {Route, Switch} from 'react-router-dom'

import ErrorBoundary from '../App/errorBoundary'
import Dashboard from '../Dashboard/dashboard'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import Environments from '../Environments/environments'
import Navigation from '../Navigation/navigation'
import {Box} from '../Primitives'
import dark from '../Theme/dark'
import Global from '../Theme/global'
import light from '../Theme/light'
import ThemeModeContext from '../Theme/themeModeContext'
import Spinner from './spinner'

const App = () => {
  const {isDark} = useContext(ThemeModeContext)
  const {initialized} = useKeycloak()
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Global />
      <nav>
        <Navigation />
      </nav>
      {initialized && (
        <S.Main as="main">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={DocumentsPage} />
              <Route exact path="/documents" component={DocumentsPage} />
              <Route
                exact
                path="/documents/:documentId"
                component={DocumentPage}
              />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Suspense>
          <S.Hidden>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Environments />
              </Suspense>
            </ErrorBoundary>
          </S.Hidden>
        </S.Main>
      )}
    </ThemeProvider>
  )
}

export default App

const S = {}

S.Hidden = styled(Box)(
  css({
    '@media (max-width: 1550px)': {
      display: 'none',
    },
  })
)
S.Box = styled(Box)(
  css({
    padding: [4],
    gridTemplateColumns: '1fr 256px',
    display: 'grid',
    gridGap: [4],
    '@media (max-width: 1550px)': {
      gridTemplateColumns: '1fr',
    },
  })
)
S.Main = styled(S.Box)`
  height: calc(100% - ${props => props.theme.sizes.nav}px);
`

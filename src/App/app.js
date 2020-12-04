import React, {Suspense, useContext} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {Route, Switch} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

import ErrorBoundary from '../App/errorBoundary'
import Dashboard from '../Dashboard/dashboard'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import Environments from '../Environments/environments'
import Navigation from '../Navigation/navigation'
import {Box} from '../Primitives'
import Primitives from '../Primitives/primitives'
import dark from '../Theme/dark'
import Global from '../Theme/global'
import light from '../Theme/light'
import ThemeModeContext from '../Theme/themeModeContext'
import Spinner from './spinner'
import useLayout from './useSidebar'
import Search from '../Search/search'

const App = () => {
  const {isDark} = useContext(ThemeModeContext)
  const {initialized} = useKeycloak()
  const {Left, Right, Middle, Layout, setSidebar, sidebar} = useLayout()
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Global />
      <nav>
        <Navigation sidebar={sidebar} setSidebar={setSidebar} />
      </nav>
      {initialized && (
        <Layout as="main">
          <Left>
            <Switch>
              <Route exact path="/" component={Search} />
              <Route exact path="/documents" component={Search} />
            </Switch>
          </Left>

          <Suspense fallback={<Spinner />}>
            <Middle>
              <S.Main>
                <Switch>
                  <Route exact path="/" component={DocumentsPage} />
                  <Route exact path="/documents" component={DocumentsPage} />
                  <Route
                    exact
                    path="/documents/:documentId"
                    component={DocumentPage}
                  />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/debug" component={Primitives} />
                </Switch>
              </S.Main>
            </Middle>
          </Suspense>
          <Right>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Environments />
              </Suspense>
            </ErrorBoundary>
          </Right>
        </Layout>
      )}
    </ThemeProvider>
  )
}

export default App

const S = {}

S.Hidden = styled(Box).attrs({
  sx: {
    display: 'none',
  },
})``
S.Main = styled(Box).attrs({})`
  height: calc(100% - ${props => props.theme.sizes.nav}px);
`

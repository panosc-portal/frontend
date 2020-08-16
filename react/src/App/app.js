import React, {Suspense} from 'react'

import normalize from 'normalize.css'
import {Route, Switch} from 'react-router-dom'
import {Box} from 'rebass/styled-components'
import styled from 'styled-components'
import {ThemeProvider, createGlobalStyle} from 'styled-components'

import Callback from '../Auth/callback'
import Dashboard from '../Dashboard/dashboard'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import Navigation from '../Navigation/navigation'
import {light, dark} from '../Theme/theme'
import useDark from '../Theme/useDark'
import Spinner from './spinner'

const GlobalStyle = createGlobalStyle`
  ${normalize}
`
function App() {
  const {isDark, toggle} = useDark()
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <GlobalStyle />
      <nav>
        <Navigation toggle={toggle} />
      </nav>
      <S.Box as="main">
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
            <Route path="/callback" component={Callback} />
          </Switch>
        </Suspense>
      </S.Box>
    </ThemeProvider>
  )
}

export default App

const S = {}
S.Box = styled(Box)`
  padding: ${props => props.theme.space[3]};
`

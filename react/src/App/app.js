import {Box} from 'rebass/styled-components'
import {Route, Switch} from 'react-router-dom'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import React, {Suspense} from 'react'
import Spinner from './spinner'
import styled from 'styled-components'
import Navigation from '../Navigation/navigation'
import Dashboard from '../Dashboard/dashboard'

function App() {
  return (
    <>
      <nav>
        <Navigation />
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
          </Switch>
        </Suspense>
      </S.Box>
    </>
  )
}

export default App

const S = {}
S.Box = styled(Box)`
  padding: ${props => props.theme.space[3]};
`

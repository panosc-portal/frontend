import {Box} from 'rebass/styled-components'
import {Route, Switch} from 'react-router-dom'
import DocumentPage from '../Document/documentPage'
import DocumentsPage from '../Documents/documentsPage'
import React, {Suspense} from 'react'
import Spinner from './spinner'
import styled from 'styled-components'

function App() {
  return (
    <Main as="main">
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={DocumentsPage} />
          <Route exact path="/documents" component={DocumentsPage} />
          <Route exact path="/documents/:documentId" component={DocumentPage} />
        </Switch>
      </Suspense>
    </Main>
  )
}

export default App

const Main = styled(Box)`
  padding: ${props => props.theme.space[3]};
`

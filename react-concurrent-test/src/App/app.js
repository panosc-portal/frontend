import React, {Suspense} from 'react'
import {Switch, Route} from 'react-router-dom'
import DocumentsPage from '../Documents/documentsPage'
import DocumentPage from '../Document/documentPage'
import styled from 'styled-components'
import {Box} from 'rebass/styled-components'
import Spinner from './spinner'

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

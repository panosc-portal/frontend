import React, {Suspense, useState} from 'react'

import styled from 'styled-components'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import DocumentsList from '../Documents/documentsList'
import Environments from '../Environments/environments'
import {Button, Box, Flex, Heading} from '../Primitives'
import Search from '../Search/search'
import Layout from '../Layout/row'

const DocumentsPage = () => {
  const [show, setShow] = useState()

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Side show={show === 'search' ? true : false}>
            <Heading variant="display">Search</Heading>
            <Search />
          </Side>
          <Main show={!show}>
            <Heading variant="display">Documents</Heading>
            <DocumentsList show={!show} />
          </Main>
          <Side show={show === 'env' ? true : false}>
            <Heading variant="display">Environments</Heading>
            <Environments />
          </Side>
        </Layout>
        <Controls>
          <Flex
            sx={{bg: 'middleground', gap: 1, justifyContent: 'space-evenly'}}
          >
            <Button
              width={1 / 3}
              variant="secondary"
              onClick={() => {
                setShow('search')
              }}
            >
              Search
            </Button>
            <Button
              width={1 / 3}
              variant="secondary"
              onClick={() => {
                setShow(null)
              }}
            >
              Documents
            </Button>
            <Button
              width={1 / 3}
              variant="secondary"
              onClick={() => {
                setShow('env')
              }}
            >
              Environments
            </Button>
          </Flex>
        </Controls>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsPage

const Main = styled(Box).attrs({
  width: [1, 1 / 3, 3 / 5],
})`

@media (max-width: ${({theme}) => theme.breakpoints[0]}) {
display: ${({show}) => (show ? 'block' : 'none')};
`
const Side = styled(Box).attrs({
  width: [1, 1 / 3, 1 / 5],
  display: ['none', 'block'],
})`
@media (max-width: ${({theme}) => theme.breakpoints[0]}) {
display: ${({show}) => (show ? 'block' : 'none')};

`
const Controls = styled(Box).attrs({
  display: ['block', 'none'],
  sx: {position: 'fixed', bottom: 0, width: '100%'},
})``

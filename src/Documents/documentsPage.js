import React, {Suspense, useState} from 'react'

import styled from 'styled-components'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import DocumentsList from '../Documents/documentsList'
import Environments from '../Environments/environments'
import {Button, Box, Flex, Heading} from '../Primitives'
import Search from '../Search/search'

const DocumentsPage = () => {
  const [show, setShow] = useState()

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Side show={show === 'search' ? true : false}>
            <Search />
          </Side>
          <Main show={!show}>
            <Heading>Documents</Heading>
            <DocumentsList show={!show} />
          </Main>
          <Side show={show === 'env' ? true : false}>
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

const Layout = styled(Flex).attrs({
  sx: {
    gap: [2, 3, 3],
  },
})``
const Main = styled(Box).attrs({
  width: [1, 1, 3 / 5],
})`

@media (max-width: ${({theme}) => theme.breakpoints[1]}) {
display: ${({show}) => (show ? 'block' : 'none')};
`
const Side = styled(Box).attrs({
  width: [1, 1, 1 / 5],
  display: ['none', 'none', 'block'],
})`
@media (max-width: ${({theme}) => theme.breakpoints[1]}) {
display: ${({show}) => (show ? 'block' : 'none')};

`
const Controls = styled(Box).attrs({
  display: ['block', 'block', 'none'],
  sx: {position: 'fixed', bottom: 0, width: '100%'},
})``

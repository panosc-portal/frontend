import {Box} from 'rebass/styled-components'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Datasets from '../Datasets/datasets'
import Document from './document'
import Environments from '../Environments/environments'
import ErrorBoundary from '../App/errorBoundary'
import React, {Suspense} from 'react'
import Spinner from '../App/spinner'
import styled from 'styled-components'
import useSWR from 'swr'

const DocumentPage = props => {
  const documentId = props.match.params.documentId
  const query = baseQuery
  query.include[0].scope = {
    include: [{relation: 'instrument'}],
  }

  const {data} = useSWR(
    '/Documents/' + documentId + '?filter=' + parseObjectToUri(query)
  )
  return (
    <S.Box>
      <DndProvider backend={HTML5Backend}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Document data={data} />
            <Datasets data={data.datasets} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Environments />
          </Suspense>
        </ErrorBoundary>
      </DndProvider>
    </S.Box>
  )
}

export default DocumentPage

const S = {}
S.Box = styled(Box)`
  display: grid;
  grid-gap: ${props => props.theme.space[2]};
  grid-template-columns: 2fr 1fr 1fr;
`

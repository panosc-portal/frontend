import React, {Suspense} from 'react'

import styled from '@emotion/styled'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import Datasets from '../Datasets/datasets'
import Environments from '../Environments/environments'
import {Box} from '../Primitives'
import Document from './document'

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
  grid-gap: ${props => props.theme.space[3]}px;
  grid-template-columns: 2fr 1fr 1fr;
`

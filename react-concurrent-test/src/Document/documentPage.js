import React, {Suspense} from 'react'
import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import Document from './document'
import styled from 'styled-components'
import useSWR from 'swr'
import {baseQuery, parseObjectToUri} from '../Search/search'
import {Box} from 'rebass/styled-components'
import Datasets from './datasets'
import Environments from '../Environments/environments'

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
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <S.Box>
          <Document data={data} />
          <Datasets data={data.datasets} />
          <Environments />
        </S.Box>
      </Suspense>
    </ErrorBoundary>
  )
}

export default DocumentPage

const S = {}
S.Box = styled(Box)`
  display: grid;
  grid-gap: ${props => props.theme.space[2]};
  grid-template-columns: 2fr 1fr 1fr;
`


import React, {Suspense} from 'react'

import styled from '@emotion/styled'
import css from '@styled-system/css'
import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
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
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Document data={data} />
        </Suspense>
      </ErrorBoundary>
    </S.Box>
  )
}

export default DocumentPage

const S = {}
S.Box = styled(Box)(css({}))

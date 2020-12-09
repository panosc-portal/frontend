import React, {Suspense} from 'react'

import css from '@styled-system/css'
import styled from 'styled-components'
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
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Document data={data} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default DocumentPage

const S = {}
S.Box = styled(Box)(css({}))

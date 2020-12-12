import React, {Suspense} from 'react'

import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import {Heading} from '../Primitives'
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
        <Heading variant="display">{data.title}</Heading>
        <Document data={data} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default DocumentPage

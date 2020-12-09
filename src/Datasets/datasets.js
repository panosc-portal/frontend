import React, {Suspense} from 'react'

import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import Dataset from '../Datasets/dataset'
import {Box, Heading} from '../Primitives'

const Datasets = props => {
  const documentId = decodeURIComponent(props.match.params.documentId)
  const query = {
    where: {
      documentId,
    },
    include: [{relation: 'instrument'}],
  }
  const {data} = useSWR('/Datasets?filter=' + parseObjectToUri(query))
  return (
    <Box>
      <Heading>Datasets</Heading>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          {data.map(dataset => (
            <Dataset dataset={dataset} key={dataset.pid} />
          ))}
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}
export default Datasets

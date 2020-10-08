import React, {Suspense} from 'react'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import Dataset from '../Datasets/dataset'
import {Box, Heading} from '../Primitives'

const Datasets = ({data}) => (
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
export default Datasets

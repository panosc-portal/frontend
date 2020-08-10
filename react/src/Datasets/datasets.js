import React from 'react'
import ErrorBoundary from '../App/errorBoundary'
import {Box, Heading} from 'rebass/styled-components'

import Dataset from '../Datasets/dataset'

const Datasets = ({data}) => (
  <Box>
    <Heading>Datasets</Heading>
    <ErrorBoundary>
      {data.map(dataset => (
        <Dataset dataset={dataset} key={dataset.pid} />
      ))}
    </ErrorBoundary>
  </Box>
)
export default Datasets

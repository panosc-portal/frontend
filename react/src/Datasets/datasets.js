import React from 'react'

import {Box, Heading} from 'rebass/styled-components'

import Dataset from '../Datasets/dataset'

const Datasets = ({data}) => (
  <Box>
    <Heading>Datasets</Heading>
    {data.map(dataset => (
      <Dataset dataset={dataset} key={dataset.pid} />
    ))}
  </Box>
)
export default Datasets

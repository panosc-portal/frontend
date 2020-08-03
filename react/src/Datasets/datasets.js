import {Box, Heading} from 'rebass/styled-components'
import Dataset from '../Datasets/dataset'
import React from 'react'

const Datasets = ({data}) => (
  <Box>
    <Heading>Datasets</Heading>
    {data.map(dataset => (
      <Dataset dataset={dataset} key={dataset.pid} />
    ))}
  </Box>
)
export default Datasets

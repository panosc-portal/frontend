import React from 'react'
import ThemeProvider from '../context/themeProvider'
import {Card, Link, Text, Heading, Box} from 'rebass'
import styled from '@emotion/styled'

const api = {
  datasets: [],
  _id: '5ee08294d8d3ec0033bfc961',
  name: 'Jupyter 1',
  flavour: {
    _id: '5ee08294d8d3ec0033bfc95e',
    name: 'Jupyter Gpu',
    type: 'jupyter',
    cpu: '32',
    gpu: '4',
    __v: 0
  },
  description: 'my jupyter environment',
  user: '5ee08294d8d3ec0033bfc95b',
  __v: 0
}
const render = () => (
  <ThemeProvider>
    <Box width={256}>
      <Instance instance={api} />
    </Box>
  </ThemeProvider>
)

const Instance = (props) => {
  const {instance, provided} = props
  return (
    <Card>
      <Heading>{instance.name}</Heading>
      <Text>{instance.flavour.name}</Text>
    </Card>
  )
}

export default render

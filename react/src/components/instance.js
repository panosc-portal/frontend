import React from 'react'
import ThemeProvider from '../context/themeProvider'
import {Card as Base, Link, Text, Heading, Button, Box as Wrapper} from 'rebass'
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
    <Box>
      <Instance instance={api} />
    </Box>
  </ThemeProvider>
)

const Instance = (props) => {
  const {instance, provided} = props
  return (
    <Card>
      <Heading>{instance.name}</Heading>
      <Text>{instance.description}</Text>
      <Link>{instance._id}</Link>
      <Button>{instance.flavour.name}</Button>
    </Card>
  )
}

export default render

const Card = styled(Base)`
  margin: ${(props) => props.theme.space[4]};
`
const Box = styled(Wrapper)`
  padding: ${(props) => props.theme.space[4]}px;
  width: ${(props) => props.theme.space[8]}px;
  background-color: ${(props) => props.theme.colors.highlight};
`

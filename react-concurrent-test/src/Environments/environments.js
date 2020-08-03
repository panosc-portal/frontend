import {Box, Card, Heading} from 'rebass/styled-components'
import React, {Suspense} from 'react'
import SpawnEnvironment from './spawnEvironment'
import Spinner from '../App/spinner'
import useSWR from 'swr'
import styled from 'styled-components'
import Environment from './environment'

const Environments = () => {
  const {data} = useSWR('/instances')
  return (
    <Box>
      <Heading>Environments</Heading>
      <Suspense fallback={<Spinner />}>
        {data.map(environment => (
          <Environment key={environment._id} environment={environment} />
        ))}
        <SpawnEnvironment dataInstances={data} />
      </Suspense>
    </Box>
  )
}

export default Environments

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[2]};
  background-color: ${props =>
    props.flavourType === 'jupyter'
      ? props.theme.colors.jupyter
      : props.theme.colors.vm};
`

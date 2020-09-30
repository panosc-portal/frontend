import React, {Suspense} from 'react'

import {Box, Card, Heading} from 'rebass/styled-components'
import styled from 'styled-components'
import useSWR from 'swr'

import Spinner from '../App/spinner'
import Environment from './environment'
import SpawnEnvironment from './spawnEvironment'

const Environments = () => {
  const {data} = useSWR('/account/instances')
  return (
    <Box>
      <Heading>Environments</Heading>
      <Suspense fallback={<Spinner />}>
        {data.map((environment, index) => (
          <Environment
            key={environment.id}
            index={index}
            environment={environment}
          />
        ))}
        <SpawnEnvironment />
      </Suspense>
    </Box>
  )
}

export default Environments

const S = {}
S.Card = styled(Card)`
  background-color: ${props =>
    props.flavourType === 'jupyter'
      ? props.theme.colors.jupyter
      : props.theme.colors.vm};
  margin-bottom: ${props => props.theme.space[3]}px;
`

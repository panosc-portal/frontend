import React, {Suspense} from 'react'
import useSWR from 'swr'
import {Box, Heading, Card} from 'rebass/styled-components'
import Spinner from '../App/spinner'
import SpawnEnvironment from './spawnEvironment'

const Environments = () => {
  const {data} = useSWR('/instances')
  return (
    <Box>
      <Heading>Environments</Heading>
      <Suspense fallback={<Spinner />}>
        {data.map(environment => (
          <Card key={environment._id}>
            <Heading>{environment.name}</Heading>
          </Card>
        ))}
        <br />
        <SpawnEnvironment dataInstances={data} />
      </Suspense>
    </Box>
  )
}

export default Environments

import React, {Suspense} from 'react'
import useSWR from 'swr'
import {Box, Heading, Card} from 'rebass/styled-components'
import Spinner from '../App/spinner'
import SpawnEnvironment from './spawnEvironment'

const Environments = () => {
  const fetcher = url => fetch(url).then(r => r.json())
  const key = process.env.REACT_APP_CLOUD + '/instances'
  const {data, mutate} = useSWR(key, fetcher)
  const refresh = () => mutate(key)
  return (
    <Box>
      <Heading>Environments</Heading>
      <Suspense fallback={<Spinner />}>
        {data.map(environment => (
          <Card key={environment._id}>
            <Heading>{environment.name}</Heading>
          </Card>
        ))}
        <SpawnEnvironment refresh={refresh} />
      </Suspense>
    </Box>
  )
}

export default Environments


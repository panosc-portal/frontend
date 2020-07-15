import React from 'react'
import useSWR from 'swr'
import {Box, Heading, Card} from 'rebass/styled-components'
import SpawnEnvironment from './spawnEvironment'

const Environments = () => {
  const fetcher = url => fetch(url).then(r => r.json())
  const key = process.env.REACT_APP_CLOUD + '/instances'
  const {data, mutate} = useSWR(key, fetcher)
  const refresh = () => mutate(key)
  return (
    <Box>
      <Heading>Environments</Heading>
      {data.map(environment => (
        <Card>
          <Heading>{environment.title}</Heading>
        </Card>
      ))}
      <SpawnEnvironment refresh={refresh} />
    </Box>
  )
}

export default Environments


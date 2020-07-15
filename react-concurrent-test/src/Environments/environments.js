import React from 'react'
import useSWR from 'swr'
import {Box, Heading, Card} from 'rebass/styled-components'

const Environments = () => {
  const fetcher = url => fetch(url).then(r => r.json())
  const {data} = useSWR(process.env.REACT_APP_CLOUD + '/instances', fetcher)
  console.log(data)
  return (
    <Box>
      <Heading>Environments</Heading>
      {data.map(environment => (
        <Card>
          <Heading>{environment.title}</Heading>
        </Card>
      ))}
    </Box>
  )
}

export default Environments


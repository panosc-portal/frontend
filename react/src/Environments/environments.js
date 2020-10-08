import React, {Suspense} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import useSWR from 'swr'

import Spinner from '../App/spinner'
import {Box, Heading, Card} from '../Primitives'
import Environment from './environment'

const Environments = () => {
  const {keycloak} = useKeycloak()
  const {data} = useSWR(keycloak.authenticated ? '/account/instances' : null, {
    refreshInterval: 3000,
  })
  return (
    <Box>
      <Heading>Environments</Heading>
      {!keycloak.authenticated ? (
        <Card>
          Sorry you need to be authenticated to use the cloud service :-(
        </Card>
      ) : (
        <Suspense fallback={<Spinner />}>
          {data.map((environment, index) => (
            <Environment
              key={environment.id}
              index={index}
              environment={environment}
            />
          ))}
        </Suspense>
      )}
    </Box>
  )
}

export default Environments

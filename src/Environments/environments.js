import React, {Suspense} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import useSWR from 'swr'

import Spinner from '../App/spinner'
import Column from '../Layout/column'
import {Card} from '../Primitives'
import Environment from './environment'

const Environments = () => {
  const {keycloak} = useKeycloak()
  const {data} = useSWR(keycloak.authenticated ? '/account/instances' : null, {
    refreshInterval: 3000,
  })
  return (
    <Suspense fallback={<Spinner />}>
      {!keycloak.authenticated ? (
        <Card>
          Sorry you need to be authenticated to use the cloud service :-(
        </Card>
      ) : data.length ? (
        <Column>
          {data.map((environment) => (
            <Environment key={environment.id} environment={environment} />
          ))}
        </Column>
      ) : (
        <Card>No running environments.</Card>
      )}
    </Suspense>
  )
}

export default Environments

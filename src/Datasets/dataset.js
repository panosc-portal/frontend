import React, {Suspense, useState} from 'react'

import {useKeycloak} from '@react-keycloak/web'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import SpawnEnvironment from '../Environments/spawnEvironment'
import {Card, Heading, Text} from '../Primitives'

const Dataset = ({dataset}) => {
  const {keycloak} = useKeycloak()
  const [fold, setFold] = useState(true)
  return (
    <Card key={dataset.pid}>
      <Heading onClick={() => keycloak.authenticated && setFold(!fold)}>
        {dataset.title}
      </Heading>
      <Text>
        {dataset.instrument.name} @ {dataset.instrument.facility}
      </Text>
      {keycloak.authenticated && (
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {fold || <SpawnEnvironment setFold={setFold} />}
          </Suspense>
        </ErrorBoundary>
      )}
    </Card>
  )
}

export default Dataset

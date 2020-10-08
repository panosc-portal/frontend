import React, {Suspense, useState} from 'react'

import styled from '@emotion/styled'
import {useKeycloak} from '@react-keycloak/web'
import css from '@styled-system/css'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import SpawnEnvironment from '../Environments/spawnEvironment'
import {Card, Heading, Text} from '../Primitives'

const Dataset = ({dataset}) => {
  const {keycloak} = useKeycloak()
  const [fold, setFold] = useState(true)
  return (
    <S.Card key={dataset.pid}>
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
    </S.Card>
  )
}

export default Dataset

const S = {}
S.Card = styled(Card)(
  css({
    marginBottom: [4],
    '&:last-of-type': {marginBottom: 0},
  })
)

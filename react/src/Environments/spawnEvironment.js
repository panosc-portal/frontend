import {Box, Card, Text} from 'rebass/styled-components'
import React, {Suspense, useState} from 'react'
import Spinner from '../App/spinner'
import styled from 'styled-components'
import useSWR, {mutate} from 'swr'
import {doFetch} from '../App/helpers'

const SpawnEnvironment = () => {
  const {data} = useSWR('/flavours')

  //state needed to trigger error boundary from async fc, see the definition of doPost
  const [, setErrorBoundary] = useState()
  const spawn = async flavour => {
    const payload = {
      flavour,
      name: 'test',
    }
    await doFetch('/instances', 'post', setErrorBoundary, payload)
    mutate('/instances')
  }

  return (
    <S.Box>
      <Suspense fallback={<Spinner />}>
        {data.map(flavour => (
          <S.Card onClick={() => spawn(flavour)} key={flavour._id}>
            <Text>{flavour.name}</Text>
          </S.Card>
        ))}
      </Suspense>
    </S.Box>
  )
}

export default SpawnEnvironment

const S = {}
S.Box = styled(Box)`
  display: grid;
  grid-gap: ${props => props.theme.space[2]};
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`
S.Card = styled(Card)``

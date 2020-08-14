import React, {Suspense} from 'react'

import {Box, Card, Text} from 'rebass/styled-components'
import styled from 'styled-components'
import useSWR, {mutate} from 'swr'

import Spinner from '../App/spinner'
import useFetch from '../App/useFetch'

const SpawnEnvironment = () => {
  const {data} = useSWR('/flavours')
  const [doFetch] = useFetch()

  const spawn = async flavour => {
    const payload = {
      flavour,
      name: 'test',
    }
    await doFetch('/instances', 'post', payload)
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

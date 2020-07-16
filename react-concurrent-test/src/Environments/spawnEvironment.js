import React, {Suspense} from 'react'
import Spinner from '../App/spinner'
import styled from 'styled-components'
import {Box, Card, Text} from 'rebass/styled-components'
import useSWR, {mutate} from 'swr'
import produce from 'immer'
import {v4 as uuid} from 'uuid'

const SpawnEnvironment = ({dataInstances}) => {
  const {data} = useSWR('/flavours')
  const spawn = async flavour => {
    const payload = {
      flavour,
      name: 'jfdskl',
    }
    await fetch(process.env.REACT_APP_CLOUD + '/instances', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // just trying out immer & optimistic ui patterns
    mutate(
      '/instances',
      produce(dataInstances, draft => {
        draft.push({...payload, _id: uuid()})
      })
    )
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


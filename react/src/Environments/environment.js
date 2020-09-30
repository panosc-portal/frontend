import React from 'react'

import {Box, Button, Card, Heading} from 'rebass/styled-components'
import styled from 'styled-components'
import {mutate} from 'swr'

import useFetch from '../App/useFetch'

const Environment = ({environment}) => {
  const [doFetch] = useFetch()
  const removeMe = async () => {
    mutate(
      '/account/instances',
      await doFetch(`/account/instances/${environment.id}`, 'delete')
    )
  }
  return (
    <S.Card
      flavourType={environment.image.name === 'jupyter' ? 'jupyter' : 'vm'}
    >
      <Heading>{environment.name}</Heading>
      <Box>plan: {environment.plan.name}</Box>
      <Button>{environment.state.status}</Button>
      <Button onClick={() => removeMe()}>Remove</Button>
    </S.Card>
  )
}

export default Environment

const S = {}
S.Card = styled(Card)`
  background-color: ${props =>
    props.flavourType === 'jupyter'
      ? props.theme.colors.jupyter
      : props.theme.colors.vm};
  margin-bottom: ${props => props.theme.space[3]}px;
  opacity: ${props => (props.canDrop && !props.isOver ? 0.5 : 1)};
`

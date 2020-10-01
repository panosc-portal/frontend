import React from 'react'

import {Box, Button, Card, Heading} from 'rebass/styled-components'
import styled from 'styled-components'
import {mutate} from 'swr'

import useFetch from '../App/useFetch'

const Environment = ({environment}) => {
  const [doFetch] = useFetch()
  const remove = async () => {
    mutate(
      '/account/instances',
      await doFetch(`/account/instances/${environment.id}`, 'delete')
    )
  }
  const action = async type => {
    doFetch(`/account/instances/${environment.id}/actions`, 'post', {type})
  }
  return (
    <S.Card
      flavourType={environment.image.name === 'jupyter' ? 'jupyter' : 'vm'}
    >
      <Heading>{environment.name}</Heading>
      <Box>plan: {environment.plan.name}</Box>
      <Button>
        <a
          target="_blank"
          href={
            environment.state.status === 'ACTIVE'
              ? 'http://' +
                environment.hostname +
                ':' +
                environment.protocols[0].port
              : ''
          }
        >
          {environment.state.status}
        </a>
      </Button>
      <Button onClick={() => remove()}>Remove</Button>
      <Button onClick={() => action('REBOOT')}>Reboot</Button>
      <Button onClick={() => action('START')}>Start</Button>
      <Button onClick={() => action('SHUTDOWN')}>Shutdown</Button>
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
`

import React from 'react'

import styled from '@emotion/styled'
import {mutate} from 'swr'

import useFetch from '../App/useFetch'
import {Box, Link, Button, Card, Heading} from '../Primitives'

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
        <Link
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
        </Link>
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

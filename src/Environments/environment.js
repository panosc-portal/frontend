import React from 'react'

import {
  PlayCircle as Play,
  DeleteBin2,
  Refresh as Restart,
  ShutDown,
} from '@emotion-icons/remix-line'
import styled from '@emotion/styled'
import css from '@styled-system/css'
import produce from 'immer'
import {mutate} from 'swr'

import useFetch from '../App/useFetch'
import {Flex, Text, Link, Box, Card, Heading} from '../Primitives'

const Icon = props => (
  <Link
    mx={2}
    size={28}
    title={props.title}
    as={props.icon}
    onClick={props.action}
    bg="foreground"
    p={1}
    flex="1"
  />
)
const Environment = ({environment}) => {
  const [doFetch] = useFetch()
  const remove = async () => {
    mutate(
      '/account/instances',
      await doFetch(`/account/instances/${environment.id}`, 'delete')
    )
  }
  const action = async type => {
    mutate(
      '/account/instances',
      produce(draft => {
        const index = draft.findIndex(obj => obj.id === environment.id)
        if (index !== -1) draft[index].state.status = 'PENDING'
      }),
      false
    )
    mutate(
      '/account/instances',
      await doFetch(`/account/instances/${environment.id}/actions`, 'post', {
        type,
      })
    )
  }
  return (
    <S.Card>
      <Heading>{environment.name}</Heading>
      <Box>
        <Text fontWeight="bold">Description</Text>
        <Text>{environment.description}</Text>
      </Box>
      <Box>
        <b>Status </b>
        {environment.state.status === 'ACTIVE' ? (
          <Link
            href={
              environment.state.status === 'ACTIVE'
                ? 'http://' +
                  environment.hostname +
                  ':' +
                  environment.protocols[0].port +
                  '?token=""'
                : ''
            }
            target="_blank"
          >
            {environment.state.status}
          </Link>
        ) : (
          environment.state.status
        )}
      </Box>
      <Box>
        <b>Plan </b>
        {environment.plan.name}
      </Box>
      <S.Flex>
        {environment.state.status === 'STOPPED' ? (
          <Icon icon={Play} title="Start" action={() => action('START')} />
        ) : (
          <Icon
            icon={ShutDown}
            title="Shutdown"
            action={() => action('SHUTDOWN')}
          />
        )}
        <Icon icon={Restart} title="Restart" action={() => action('REBOOT')} />
        <Icon icon={DeleteBin2} title="Remove" action={() => remove()} />
      </S.Flex>
    </S.Card>
  )
}

export default Environment

const S = {}
S.Card = styled(Card)(
  css({
    marginBottom: [4],
  })
)
S.Flex = styled(Flex)(
  css({
    marginTop: [3],
    justifyContent: 'space-around',
    width: '100%',
  })
)

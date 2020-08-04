import React, {useState} from 'react'

import {useDrop} from 'react-dnd'
import {Box, Button, Card, Heading, Text} from 'rebass/styled-components'
import styled from 'styled-components'
import {mutate} from 'swr'

import {doFetch} from '../App/helpers'
import Dataset from './dataset'

const Environment = ({environment}) => {
  const [, setErrorBoundary] = useState()

  const removeDataset = async id => {
    const uri = `/instances/${encodeURIComponent(
      environment._id
    )}/dataset/${encodeURIComponent(id)}`
    await doFetch(uri, 'delete', setErrorBoundary)
    mutate('/instances')
  }

  const removeMe = async () => {
    const uri = `/instances/${encodeURIComponent(environment._id)}`
    await doFetch(uri, 'delete', setErrorBoundary)
    mutate('/instances')
  }

  const [{canDrop, isOver}, drop] = useDrop({
    accept: 'dataset',
    drop: () => ({name: environment.name, id: environment._id}),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  return (
    <S.Card
      key={environment._id}
      ref={drop}
      flavourType={environment.flavour.type}
    >
      <Heading>{environment.name}</Heading>
      <Box>
        {environment.datasets.map(dataset => (
          <Dataset key={dataset} id={dataset} removeMe={removeDataset} />
        ))}
        <Text>{canDrop ? 'drop' : 'dont'}</Text>
        <Text>{isOver ? 'its over me' : 'its elsewhere'}</Text>
        <Button onClick={() => removeMe()}>Remove Me</Button>
      </Box>
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
  margin-bottom: ${props => props.theme.space[2]};
`

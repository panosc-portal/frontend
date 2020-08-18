import React from 'react'

import {useDrop} from 'react-dnd'
import {Box, Button, Card, Heading} from 'rebass/styled-components'
import styled from 'styled-components'
import {mutate} from 'swr'

import useFetch from '../App/useFetch'
import Dataset from './dataset'

const Environment = ({environment}) => {
  const [doFetch] = useFetch()
  const removeDataset = async id => {
    const uri = `/instances/${encodeURIComponent(
      environment._id
    )}/dataset/${encodeURIComponent(id)}`
    await doFetch(uri, 'delete')
    mutate('/instances')
  }

  const removeMe = async () => {
    const uri = `/instances/${encodeURIComponent(environment._id)}`
    await doFetch(uri, 'delete')
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
      isOver={isOver}
      canDrop={canDrop}
    >
      <Heading>{environment.name}</Heading>
      <Box>
        {environment.datasets.map(dataset => (
          <Dataset key={dataset} id={dataset} removeMe={removeDataset} />
        ))}
        <Button onClick={() => removeMe()}>rm instance</Button>
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
  margin-bottom: ${props => props.theme.space[3]}px;
  opacity: ${props => (props.canDrop && !props.isOver ? 0.5 : 1)};
`

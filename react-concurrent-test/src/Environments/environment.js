import {Box, Text, Card, Heading} from 'rebass/styled-components'
import Dataset from '../Datasets/dataset'
import React from 'react'
import styled from 'styled-components'
import {useDrop} from 'react-dnd'
import {ItemTypes} from '../App/itemTypes'

const Environment = ({environment}) => {
  const [{canDrop, isOver}, drop] = useDrop({
    accept: ItemTypes.DATASET,
    drop: () => ({name: environment.name}),
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
      {environment.datasets && (
        <Box>
          {environment.datasets.map(dataset => (
            <Dataset dataset={dataset} key={dataset.pid} />
          ))}
          <Text>{canDrop ? 'drop' : 'dont'}</Text>
          <Text>{isOver ? 'its over me' : 'its elsewhere'}</Text>
        </Box>
      )}
    </S.Card>
  )
}

export default Environment

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[2]};
  background-color: ${props =>
    props.flavourType === 'jupyter'
      ? props.theme.colors.jupyter
      : props.theme.colors.vm};
`

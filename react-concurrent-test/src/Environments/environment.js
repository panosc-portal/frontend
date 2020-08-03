import {Box, Card, Heading, Text} from 'rebass/styled-components'
import {useDrop} from 'react-dnd'
import Dataset from './dataset'
import React from 'react'
import styled from 'styled-components'

const Environment = ({environment}) => {
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
      {environment.datasets && (
        <Box>
          {environment.datasets.map(dataset => (
            <Dataset key={dataset} id={dataset} />
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
  background-color: ${props =>
    props.flavourType === 'jupyter'
      ? props.theme.colors.jupyter
      : props.theme.colors.vm};
  margin-bottom: ${props => props.theme.space[2]};
`

import {Card, Heading, Text} from 'rebass/styled-components'
import React from 'react'
import styled from 'styled-components'
import {useDrag} from 'react-dnd'
import {ItemTypes} from '../App/itemTypes'

const Dataset = ({dataset, name}) => {
  const [{isDragging}, drag] = useDrag({
    item: {name, type: ItemTypes.DATASET},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  return (
    <S.Card key={dataset.pid} isDragging={isDragging} ref={drag}>
      <Heading>{dataset.title}</Heading>
      <Text>
        {dataset.instrument.name} @ {dataset.instrument.facility}
      </Text>
      <Text>{isDragging ? 'yay, im flying' : 'grounded'}</Text>
    </S.Card>
  )
}

export default Dataset

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[2]};
  opacity: ${props => (props.isDragging ? 0.2 : 1)};
`

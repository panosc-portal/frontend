import {Card, Heading, Text} from 'rebass/styled-components'
import {mutate} from 'swr'
import {useDrag} from 'react-dnd'
import React from 'react'
import styled from 'styled-components'

const Dataset = ({dataset}) => {
  const [{isDragging}, drag] = useDrag({
    item: {name: dataset.title, id: dataset.pid, type: 'dataset'},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        pushDataset({
          dataset: encodeURIComponent(item.id),
          instance: encodeURIComponent(dropResult.id),
        })
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const pushDataset = async payload => {
    await fetch(
      `${process.env.REACT_APP_CLOUD}/instances/${payload.instance}/dataset/${payload.dataset}`,
      {
        method: 'post',
      }
    )
    mutate('/instances')
  }
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
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`

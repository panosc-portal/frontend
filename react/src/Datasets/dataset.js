import React from 'react'

import {useDrag} from 'react-dnd'
import {Card, Heading, Text} from 'rebass/styled-components'
import styled from 'styled-components'
import {mutate} from 'swr'

import {doFetch} from '../App/helpers'

const Dataset = ({dataset}) => {
  const [{isDragging}, drag] = useDrag({
    item: {id: dataset.pid, type: 'dataset'},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        addDataset(dropResult.id, item.id)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const addDataset = (instanceId, datasetId) => {
    const uri = `/instances/${encodeURIComponent(
      instanceId
    )}/dataset/${encodeURIComponent(datasetId)}`
    mutate('/instances', doFetch(uri, 'post'))
  }

  return (
    <S.Card key={dataset.pid} isDragging={isDragging} ref={drag}>
      <Heading>{dataset.title}</Heading>
      <Text>
        {dataset.instrument.name} @ {dataset.instrument.facility}
      </Text>
    </S.Card>
  )
}

export default Dataset

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[2]};
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`

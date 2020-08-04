import {Card, Heading, Text} from 'rebass/styled-components'
import {mutate} from 'swr'
import {useDrag} from 'react-dnd'
import React, {useState} from 'react'
import styled from 'styled-components'
import {doFetch} from '../App/helpers'

const Dataset = ({dataset}) => {
  const [, setErrorBoundary] = useState()

  const pushDataset = async payload => {
    const uri = `/instances/${encodeURIComponent(
      payload.instance
    )}/dataset/${encodeURIComponent(payload.dataset)}`
    await doFetch(uri, 'post', setErrorBoundary)
    mutate('/instances')
  }

  const [{isDragging}, drag] = useDrag({
    item: {name: dataset.title, id: dataset.pid, type: 'dataset'},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        pushDataset({
          dataset: item.id,
          instance: dropResult.id,
        })
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
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`

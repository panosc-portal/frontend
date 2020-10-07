import React from 'react'

import styled from '@emotion/styled'

import {Card, Heading, Text} from '../Primitives'

const Dataset = ({dataset}) => {
  return (
    <S.Card key={dataset.pid}>
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
  margin-bottom: ${props => props.theme.space[3]}px;
  ${({inUse}) => inUse && 'background-color: rebeccapurple'}
`

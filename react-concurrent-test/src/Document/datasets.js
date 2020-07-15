import React from 'react'
import {Box, Card, Heading, Text} from 'rebass/styled-components'
import styled from 'styled-components'

const Datasets = ({data}) => (
  <Box>
    <Heading>Datasets</Heading>
    {data.map(dataset => (
      <S.Card key={dataset.pid}>
        <Heading>{dataset.title}</Heading>
        <Text>
          {dataset.instrument.name} @ {dataset.instrument.facility}
        </Text>
      </S.Card>
    ))}
  </Box>
)
export default Datasets

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[2]};
`

import {Card, Button, Heading} from 'rebass/styled-components'
import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

const Dataset = ({id, removeMe}) => {
  const {data} = useSWR(`/Datasets/${encodeURIComponent(id)}`)
  return (
    <S.Card>
      <Heading>{data.title}</Heading>
      <S.Button onClick={() => removeMe(id)}>Remove me</S.Button>
    </S.Card>
  )
}
export default Dataset

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[1]};
`
S.Button = styled(Button)``

import React from 'react'

import {Card, Button, Heading} from 'rebass/styled-components'
import styled from 'styled-components'
import useSWR from 'swr'

const Dataset = ({id, removeMe}) => {
  const {data} = useSWR(`/Datasets/${encodeURIComponent(id)}`)
  return (
    <S.Card>
      <Heading>{data.title}</Heading>
      <S.Button onClick={() => removeMe(id)}>rm dataset</S.Button>
    </S.Card>
  )
}
export default Dataset

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[2]}px;
`
S.Button = styled(Button)``

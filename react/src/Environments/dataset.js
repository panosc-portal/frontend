import {Card, Heading} from 'rebass/styled-components'
import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

const Dataset = ({id}) => {
  console.log(id)
  const {data} = useSWR(`/Datasets/${encodeURIComponent(id)}`)
  return (
    <S.Card>
      <Heading>{data.title}</Heading>
    </S.Card>
  )
}
export default Dataset

const S = {}
S.Card = styled(Card)`
  margin-bottom: ${props => props.theme.space[1]};
`

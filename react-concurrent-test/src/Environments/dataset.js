import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import {Card, Heading} from 'rebass/styled-components'

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

import React from 'react'

import styled from 'styled-components'

import Datasets from '../Datasets/datasets'
import {Box, Card, Heading, Image, Link, Text, Flex} from '../Primitives'

const Details = props => <S.Details>{props.children}</S.Details>
const Detail = props => (
  <S.Detail>
    <S.Text fontWeight="bold">{props.caption}</S.Text>
    <S.Text>{props.children}</S.Text>
  </S.Detail>
)

const Document = ({data}) => {
  return (
    <S.Box>
      <Heading>{data.title}</Heading>
      <S.LeftFlex>
        <Card m={0}>
          <Text fontWeight="bold">Description</Text>
          <Text>{data.summary}</Text>
        </Card>
        <Details>
          <Detail caption="Citation">
            <Link to={'http://doi.org/' + data.doi} target="_blank">
              {data.citation}
            </Link>
          </Detail>
          <Detail caption="Keywords">
            {data.keywords.map(keyword => keyword + ', ')}
          </Detail>
          <Detail caption="Type">{data.type}</Detail>
          <Detail caption="Author">{data.members[0]?.person.fullName}</Detail>
          <Detail caption="Other">Stuff</Detail>
        </Details>
      </S.LeftFlex>
      <S.RightFlex>
        <Datasets data={data.datasets} />
        <Box>
          <S.Card>
            <Text fontWeight="bold">Preview Visualization</Text>
          </S.Card>
          <S.Image src={data.img} />
        </Box>
      </S.RightFlex>
    </S.Box>
  )
}

export default Document

const S = {}
S.Box = styled(Box).attrs({
  sx: {
    display: 'grid',
    columnGap: [4],
    gridTemplateColumns: '1fr 256px ',
    gridTemplateRows: 'min-content 1fr',
  },
})``
S.LeftFlex = styled(Flex).attrs({
  sx: {
    flexDirection: 'column',
    gap: [4],
    gridColumn: '1/2',
  },
})``
S.RightFlex = styled(Flex).attrs({
  sx: {
    flexDirection: 'column',
    gap: [4],
    gridColumn: '2/3',
    gridRow: '1/-1',
  },
})``
S.Image = styled(Image)`
  display: block;
`
S.Card = styled(Card).attrs({
  marginBottom: 0,
})``
S.Details = styled(Box)``
S.Detail = styled(Card).attrs({
  sx: {
    display: 'grid',
    gridTemplateColumns: '25% 1fr',
    gridGap: [1],
    bg: 'background',
    m: 0,
    p: 0,
    my: [1],
  },
})``
S.Text = styled(Text).attrs({
  bg: 'middleground',
  p: [2],
  py: [3],
})``

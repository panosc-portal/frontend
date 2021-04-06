import React from 'react'

import styled from 'styled-components'

import {Box, Card, Heading, Link, Text} from '../Primitives'

const Detail = (props) => (
  <S.Detail>
    <S.Text fontWeight="bold">{props.caption}</S.Text>
    <S.Text>{props.children}</S.Text>
  </S.Detail>
)

const Document = ({data}) => {
  return (
    <Box>
      <Card>
        <Heading>Description</Heading>
        <Text>{data.summary}</Text>
      </Card>
      <Box>
        <Detail caption="Citation">
          <Link to={'http://doi.org/' + data.doi} target="_blank">
            {data.citation}
          </Link>
        </Detail>
        <Detail caption="Keywords">
          {data.keywords.map((keyword) => keyword + ', ')}
        </Detail>
        <Detail caption="Type">{data.type}</Detail>
        <Detail caption="Author">{data.members[0]?.person.fullName}</Detail>
        <Detail caption="Other">Stuff</Detail>
      </Box>
    </Box>
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
S.Card = styled(Card).attrs({
  marginBottom: 0,
})``
S.Detail = styled(Box).attrs({
  sx: {
    display: 'grid',
    gridTemplateColumns: '25% 1fr',
    gridGap: '1px',
    bg: 'background',
    p: 0,
    m: 0,
    my: '1px',
  },
})``
S.Text = styled(Text).attrs({
  bg: 'middleground',
  px: [1, 2, 3, 4],
  py: [2],
})``

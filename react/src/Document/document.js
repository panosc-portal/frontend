import React from 'react'

import styled from '@emotion/styled'

import {Box, Card, Heading, Image, Link, Text} from '../Primitives'

const Document = ({data}) => {
  return (
    <Box>
      <Heading>{data.title}</Heading>
      <Card>
        <Text>{data.summary}</Text>
        <S.Image src={data.img} />
        <Link to={'http://doi.org/' + data.doi} target="_blank">
          {data.citation}
        </Link>
      </Card>
    </Box>
  )
}

export default Document

const S = {}
S.Image = styled(Image)`
  display: block;
`

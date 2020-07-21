import React from 'react'
import {Box, Link, Heading, Text, Card, Image} from 'rebass/styled-components'
import styled from 'styled-components'

const Document = ({data}) => {
  return (
    <Box>
      <Heading>{data.title}</Heading>
      <Card>
        <Text>{data.summary}</Text>
        <S.Image src={data.img} />
        <Link href={'http://doi.org/' + data.doi} target="_blank">
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

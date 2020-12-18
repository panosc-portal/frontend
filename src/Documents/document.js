import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

import {parseDate} from '../App/helpers'
import {documentSize} from '../App/helpers'
import Spinner from '../App/spinner'
import {Card, Box, Flex, Image, Heading, Link, Text} from '../Primitives'

const MetaItem = ({title, data}) => (
  <S.MetaItem>
    <S.Text>{title}</S.Text>
    <S.Text>{data}</S.Text>
  </S.MetaItem>
)

const Member = ({data}) => (
  <S.Tag>
    {data.person.fullName.substring(data.person.fullName.lastIndexOf(' ') + 1) +
      ' / ' +
      data.affiliation.name}
  </S.Tag>
)
const Members = ({members, className}) => (
  <Flex className={className}>
    {members.map(member => (
      <Member key={member.id} data={member} />
    ))}
  </Flex>
)

const HeadingLink = ({title, pid}) => (
  <Link as={RouterLink} to={'/documents/' + encodeURIComponent(pid)}>
    <Heading>{title.substring(0, 90)}</Heading>
  </Link>
)

const CitationLink = ({citation, doi, className}) => (
  <Link className={className} href={'http://doi.org/' + doi}>
    {citation}
  </Link>
)

const Keywords = ({keywords, className}) => (
  <Flex className={className}>
    {keywords.map((keyword, index) => (
      <Card variant="badge" key={index}>
        {keyword}
      </Card>
    ))}
  </Flex>
)

const Document = ({document}) => {
  return !document ? (
    <Spinner />
  ) : (
    <S.Layout>
      <Box width={[1, 1 / 2, 1, 1 / 3, 2 / 7]}>
        <Image width="100%" src={document.img} />
      </Box>
      <Card width={[1, 1 / 2, 1, 2 / 3, 5 / 7]}>
        <HeadingLink pid={document.pid} title={document.title} />
        <S.Keywords keywords={document.keywords} />
        <ClippedText mt={2} lineHeight="1.5" children={document.summary} />

        <S.MetaList>
          <MetaItem title="Created" data={parseDate(document.releseDate)} />
          <MetaItem title="Size" data={documentSize(document.datasets)} />
        </S.MetaList>
      </Card>
    </S.Layout>
  )
}
export default Document

const S = {}
S.Keywords = styled(Keywords)``
S.Members = styled(Members)``
S.CitationLink = styled(CitationLink)``
S.Layout = styled(Flex).attrs({
  flexWrap: 'wrap',
})`
  ${S.Members}, ${S.CitationLink} {
    display: none;
  }
`
S.Main = styled(Box).attrs({
  p: 3,
})``
S.MetaList = styled(Box).attrs({
  sx: {
    display: 'flex',
    flexDirection: 'row',
    mt: 1,
  },
})``
S.MetaItem = styled(Box).attrs({
  bg: 'middleground',
  justifyContent: 'space-evenly',
  mr: 1,
})``
S.Text = styled(Text).attrs({
  display: 'inline-block',
  pr: 1,
})``
S.Tag = styled(Box).attrs({
  bg: 'foreground',
  p: 1,
  m: 1,
  marginLeft: 0,
})``
// S.Image = styled(Image).attrs({
//   width: '100%',
// })``
const ClippedText = styled(Box).attrs({
  sx: {
    '-webkit-line-clamp': ['9', '6', '3', '3', '6'],
  },
})`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`

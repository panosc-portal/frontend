import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

import {parseDate} from '../App/helpers'
import Spinner from '../App/spinner'
import {Box, Flex, Heading, Link, Image, Text} from '../Primitives'

const MetaItem = ({title, data}) => (
  <S.MetaItem>
    <Text fontWeight="bold">{title}</Text>
    <Text>{data}</Text>
  </S.MetaItem>
)

const Member = ({data}) => (
  <S.Tag>
    {data.person.fullName.substring(data.person.fullName.lastIndexOf(' ') + 1) +
      ' / ' +
      data.affiliation.name}
  </S.Tag>
)
const Members = ({members}) => (
  <Flex>
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

const SummaryText = ({summary}) => {
  return <Text>{summary.substring(0, 150)}...</Text>
}

const CitationLink = ({citation, doi}) => (
  <Link href={'http://doi.org/' + doi}>{citation}</Link>
)

const Keywords = ({keywords}) => (
  <Flex>
    {keywords.map((keyword, index) => (
      <S.Tag key={index}>{keyword}</S.Tag>
    ))}
  </Flex>
)

const Document = ({document, style}) =>
  !document ? (
    <Spinner />
  ) : (
    <Box key={document.pid} style={style}>
      <S.Layout>
        <S.Main>
          <HeadingLink pid={document.pid} title={document.title} />
          <Members members={document.members} />
          <SummaryText summary={document.summary} />
          <CitationLink citation={document.citation} doi={document.doi} />
          <Keywords keywords={document.keywords} />
        </S.Main>
        <S.MetaList>
          <MetaItem title="Type" data={document.type} />
          <MetaItem
            title="Licence / Visibility"
            data={`${document.licence} / ${
              document.isPublic ? 'Public' : 'Non-Public'
            }`}
          />
          <MetaItem title="Started on" data={parseDate(document.startDate)} />
          <MetaItem title="Ended on" data={parseDate(document.endDate)} />
          <MetaItem
            title="Released on"
            data={parseDate(document.releaseDate)}
          />
        </S.MetaList>
        <S.Image src={document.img} />
      </S.Layout>
    </Box>
  )
export default Document

const S = {}
S.Layout = styled(Box).attrs({
  display: 'grid',
  marginBottom: [2, 1, 2, 3],
  sx: {gridGap: '1px'},
})`
  grid-template-columns: 3fr 1fr 1fr;
`
S.Main = styled(Flex).attrs({
  flexDirection: 'column',
  justifyContent: 'space-between',
  bg: 'middleground',
  p: 3,
})``
S.MetaList = styled(Flex).attrs({
  bg: 'background',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: '1px',
})``
S.MetaItem = styled(Flex).attrs({
  bg: 'middleground',
  p: 1,
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  marginBottom: '0.2rem',
  flex: 'auto',
})`
  &:last-of-type {
    margin-bottom: 0;
  }
`

S.Tag = styled(Box).attrs({
  bg: 'foreground',
  p: 1,
  m: 1,
  marginLeft: 0,
})``
S.Image = styled(Image).attrs()``

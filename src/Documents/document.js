import React from 'react'

import styled from '@emotion/styled'
import css from '@styled-system/css'
import {Link as RouterLink} from 'react-router-dom'

import {momented} from '../App/helpers'
import Spinner from '../App/spinner'
import {Box, Flex, Heading, Link, Image, Text} from '../Primitives'

const Member = ({data}) => (
  <S.Tag>
    {data.person.fullName.substring(data.person.fullName.lastIndexOf(' ') + 1) +
      ' / ' +
      data.affiliation.name}
  </S.Tag>
)

const Detail = ({title, data}) => (
  <S.Detail>
    <Text fontWeight="bold">{title}</Text>
    <Text>{data}</Text>
  </S.Detail>
)

const Document = ({document, style}) =>
  !document ? (
    <Spinner />
  ) : (
    <Box key={document.pid} style={style}>
      <S.Layout>
        <S.Flex>
          <Link
            as={RouterLink}
            to={'/documents/' + encodeURIComponent(document.pid)}
          >
            <Heading>{document.title.substring(0, 90)}</Heading>
          </Link>

          <Flex>
            {document.members.map(member => (
              <Member key={member.id} data={member} />
            ))}
          </Flex>

          <Text>{document.summary.substring(0, 150)}...</Text>

          <Link href={'http://doi.org/' + document.doi}>
            {document.citation}
          </Link>

          <Flex>
            {document.keywords.map((keyword, index) => (
              <S.Tag key={index}>{keyword}</S.Tag>
            ))}
          </Flex>
        </S.Flex>

        <S.Details>
          <Detail title="Type" data={document.type} />
          <Detail
            title="Licence / Visibility"
            data={`${document.licence} / ${
              document.isPublic ? 'Public' : 'Non-Public'
            }`}
          />
          <Detail title="Started on" data={momented(document.startDate)} />
          <Detail title="Ended on" data={momented(document.endDate)} />
          <Detail title="Released on" data={momented(document.releaseDate)} />
        </S.Details>

        <Image src={document.img} />
      </S.Layout>
    </Box>
  )
export default Document

const S = {}
S.PreLayout = styled(Box)(
  css({
    display: 'grid',
    gridGap: [1],
    marginBottom: [4],
    '@media (max-width: 1550px)': {
      height: '500px',
    },
  })
)
S.Layout = styled(S.PreLayout)`
  grid-template-columns: 1fr max-content ${({theme}) => theme.sizes.image}px;
  @media (max-width: 1550px) {
    grid-template-columns: 220px 1fr;
    grid-template-rows: 220px 300px;
  }
`
S.Flex = styled(Flex)(
  css({
    flexDirection: 'column',
    justifyContent: 'space-between',
    bg: 'middleground',
    p: 3,
    '@media (max-width: 1550px)': {gridRow: '2/3', gridColumn: '1/3'},
  })
)
S.Details = styled(S.Flex)(
  css({
    bg: 'background',
    p: 0,
    '@media (max-width: 1550px)': {gridRow: '1/2', gridColumn: '2/3'},
  })
)

S.Tag = styled(Box)(
  css({
    bg: 'foreground',
    p: 1,
    m: 1,
    marginLeft: 0,
  })
)
S.Detail = styled(Flex)(
  css({
    bg: 'middleground',
    p: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 1,
    flex: 'auto',
    '&:last-of-type': {
      marginBottom: 0,
    },
    '@media (max-width: 1550px)': {
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  })
)

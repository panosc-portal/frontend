import React from 'react'

import {Link} from 'react-router-dom'
import {Box, Card, Heading, Image, Text} from 'rebass/styled-components'
import styled from 'styled-components'

import {momented} from '../App/helpers'
import Spinner from '../App/spinner'

const Document = ({style, document}) => {
  if (!document) {
    return <Spinner />
  }
  return (
    <S.Card key={document.pid} style={style} id={document.pid}>
      <Box>
        <Heading
          as={Link}
          to={'/documents/' + encodeURIComponent(document.pid)}
        >
          {document.title}
        </Heading>
        <Text>
          {document.members.map(
            member =>
              member.person.fullName + '@' + member.affiliation.name + '  '
          )}
        </Text>
        <Text>{document.summary.substring(0, 350)}...</Text>
        <Text>{document.citation}</Text>
        {document.keywords.map((keyword, index) => (
          <Text key={index}>{keyword}</Text>
        ))}
      </Box>

      <Box>
        <Text>{document.type}</Text>
        <Text>
          {document.licence} / {document.isPublic ? 'Public' : 'Non-Public'}
        </Text>
        <Text>Started {momented(document.startDate)}</Text>
        <Text>Ended {momented(document.endDate)}</Text>
        <Text>Released {momented(document.releaseDate)}</Text>
      </Box>

      <Image src={document.img} />
    </S.Card>
  )
}
export default Document

const S = {}
S.Card = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 15rem 15rem;
  margin-bottom: 30px;
  max-height: 270px;
`

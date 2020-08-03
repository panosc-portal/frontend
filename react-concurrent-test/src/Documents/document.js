import {Box, Card, Heading, Image, Text} from 'rebass/styled-components'
import React from 'react'
import {momented} from '../App/helpers'
import styled from 'styled-components'

const Document = ({document}) => (
  <S.Card key={document.pid} id={document.pid}>
    <Box>
      <Heading as="a" href={'/documents/' + encodeURIComponent(document.pid)}>
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

export default Document

const S = {}
S.Card = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 15rem 15rem;
`

import React from 'react'
import moment from 'moment'
import {
  Box,
  Card as CardBase,
  Text,
  Image,
  Heading,
} from 'rebass/styled-components'
import styled from 'styled-components'

const Document = ({document}) => (
  <Card key={document.pid} id={document.pid}>
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
      <Text>Started {moment(document.startDate).format('L')}</Text>
      <Text>Ended {moment(document.endDate).format('L')}</Text>
      <Text>Released {moment(document.releaseDate).format('L')}</Text>
    </Box>

    <Image src={document.img} />
  </Card>
)

export default Document

const Card = styled(CardBase)`
  display: grid;
  grid-template-columns: 1fr 15rem 15rem;
`


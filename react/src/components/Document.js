import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {NoUl, Div, Img, H2} from './Commons'

const Document = ({document}) => (
  <Layout>
    <Metas>
      <Meta>Licence / Visibility</Meta>
      <Meta>
        {document.licence} / {document.isPublic ? 'Public' : 'Classified'}
      </Meta>
      <Meta>Type</Meta>
      <Meta>{document.type}</Meta>
      <Meta>Started</Meta>
      <Meta>{moment(document.startDate).format('L')}</Meta>
      <Meta>Ended</Meta>
      <Meta>{moment(document.endDate).format('L')}</Meta>
      <Meta>Released</Meta>
      <Meta>{moment(document.releaseDate).format('L')}</Meta>
      <Meta>Citation</Meta>
      <Meta>{document.citation}</Meta>
      <Image src={document.img} />
    </Metas>
    <Members>
      <H2>Members</H2>
      {document.members.map((m, index) => (
        <MemberLi key={index}>
          <MemberFieldName>{m.name}</MemberFieldName>
          <MemberField>{m.affiliation}</MemberField>
          <MemberField>{m.role}</MemberField>
        </MemberLi>
      ))}
    </Members>
    <Summary>
      <H2>Summary</H2>
      <Div>
        {document.summary}
        <Badges>
          {document.keywords.map((k, index) => (
            <Badge key={index}>{k}</Badge>
          ))}
        </Badges>
      </Div>
    </Summary>
  </Layout>
)

export default Document

const Layout = styled.article`
  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-gap: var(--dist);
`

const Metas = styled.div`
  display: grid;
  grid-template-rows: repeat(6, minmax(min-content, 2fr));
  grid-template-columns: min-content 1fr 15rem;
  grid-gap: var(--dist-tiny);
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 0.8rem;
  background-color: var(--color-bg-1);
  padding: 0 var(--dist-small);
`

const Image = styled(Img)`
  grid-row: 1/-1;
  grid-column: 3/4;
`

const Members = NoUl

const MemberLi = styled.li`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: var(--dist-tiny);
  margin: var(--dist-tiny) 0;
`

const MemberField = styled.div`
  font-size: 0.8rem;
  padding: var(--dist-smaller) var(--dist-small);
  background-color: var(--color-bg-1);
`

const MemberFieldName = styled(MemberField)`
  font-weight: bold;
`

const Summary = styled.section``

const Badges = styled(NoUl)`
  display: flex;
  flex-flow: row wrap;
  margin-top: var(--dist-small);
`

const Badge = styled.li`
  padding: var(--dist-smaller) var(--dist-small);
  text-transform: capitalize;
  background-color: var(--color-bg-2);
  margin-right: var(--dist-smaller);
  font-size: 0.8rem;
`

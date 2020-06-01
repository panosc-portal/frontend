import React from 'react'
import styled from 'styled-components'
import {useSearchApi} from '../utils/useApi.js'
import {Link} from 'react-router-dom'
import {NoUl, Div, Img, H3} from './Commons'
import moment from 'moment'

const Doc = ({d}) => (
  <Document>
    <Main>
      <Link to={'/documents/' + encodeURIComponent(d.pid)}>
        <H3>{d.title}</H3>
      </Link>
      <Members>
        {d.members.map((m) => (
          <Member key={m.id}>
            {m.person.fullName} ({m.affiliation.name} / {m.role})
          </Member>
        ))}
      </Members>
      <ShortSummary>{d.summary}</ShortSummary>
      <Citation>{d.citation}</Citation>
      <Badges>
        {d.keywords.map((keyword, index) => (
          <Badge key={index}>{keyword}</Badge>
        ))}
      </Badges>
    </Main>
    <Metas>
      <Meta>
        <strong>{d.type}</strong>
      </Meta>
      <Meta>
        <strong>
          {d.licence} / {d.isPublic ? 'Public' : 'Non-Public'}
        </strong>
      </Meta>
      <Meta>
        Datasets <strong>{d.datasets.length}</strong>
      </Meta>
      <Meta>
        Started <strong>{moment(d.startDate).format('L')}</strong>
      </Meta>
      <Meta>
        Ended <strong>{moment(d.endDate).format('L')}</strong>
      </Meta>
      <Meta>
        Released <strong>{moment(d.releaseDate).format('L')}</strong>
      </Meta>
    </Metas>
    <Img src={d.img} />
  </Document>
)
const DocumentList = ({query}) => {
  const {data, isLoading} = useSearchApi('Documents', query)
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <NoUl>
          {data.map((document) => (
            <Doc key={document.pid} d={document} />
          ))}
        </NoUl>
      )}
    </>
  )
}

export default DocumentList

const Document = styled.li`
  display: grid;
  grid-template-columns: minmax(35rem, 1fr) 10rem 15rem;
  grid-gap: var(--dist-tiny);
  height: 15rem;
  overflow: hidden;
  margin-bottom: var(--dist);
`

const Main = styled(Div)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`

const Members = styled.div`
  display: flex;
  flex-flow: row;
  font-size: 0.8rem;
  font-weight: bold;
`

const Member = styled.span`
  & + &:before {
    content: '|';
    padding: 0 var(--dist-smaller);
  }
`

const ShortSummary = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Citation = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`

const Badges = styled(NoUl)`
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  height: 1.8rem;
`

const Badge = styled.li`
  padding: var(--dist-smaller) var(--dist-small);
  text-transform: capitalize;
  background-color: var(--color-bg-2);
  margin-right: var(--dist-smaller);
  font-size: 0.8rem;
  height: 1.4rem;
`

const Metas = styled(NoUl)`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: var(--dist-tiny);
`

const Meta = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 0.8rem;
  background-color: var(--color-bg-1);
  padding: 0 var(--dist-small);
`

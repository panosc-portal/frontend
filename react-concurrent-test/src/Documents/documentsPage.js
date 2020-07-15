import React, {Suspense, useState, useEffect} from 'react'
import styled from 'styled-components'
import Search from '../Search/search'
import {Box} from 'rebass/styled-components'
import {useSWRInfinite} from 'swr'
import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import Document from './document'
import {useInView} from 'react-intersection-observer'

const DocumentsPage = () => {
  const limit = 2
  const baseQueryWithScroll = {
    include: [
      {
        relation: 'datasets',
      },
      {
        relation: 'members',
        scope: {
          include: [
            {
              relation: 'affiliation',
            },
            {
              relation: 'person',
            },
          ],
        },
      },
    ],
    limit,
  }

  const parseToUri = object => encodeURIComponent(JSON.stringify(object))

  const [queryObject, setQueryObject] = useState(baseQueryWithScroll)
  const {data, size, setSize} = useSWRInfinite(index => {
    const queryObjectWithSkip = {...queryObject, skip: index * limit}
    return `/Documents?filter=${parseToUri(queryObjectWithSkip)}`
  })
  const documents = data ? [].concat(...data) : []

  const loadMore = () => (size > 0 ? setSize(size + 1) : setSize(2))

  const [ref, inView] = useInView()
  console.log(inView)
  useEffect(() => {
    inView && loadMore() && console.log('more')
  }, [inView])

  return (
    <S.Box>
      <Search setQueryObject={setQueryObject} />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <S.List>
            {documents.map(document => (
              <Document key={document.pid} document={document} />
            ))}
          </S.List>
          <Box ref={ref} />
        </Suspense>
      </ErrorBoundary>
    </S.Box>
  )
}
export default DocumentsPage

const S = {}
S.Box = styled(Box)`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 3fr;
`
S.List = styled(Box)`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: ${props => props.theme.space[3]};
`


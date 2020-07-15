import React, {Suspense, useState, useEffect} from 'react'
import styled from 'styled-components'
import Search, {baseQuery, parseObjectToUri} from '../Search/search'
import {Box} from 'rebass/styled-components'
import {useSWRInfinite} from 'swr'
import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import Document from './document'
import {useInView} from 'react-intersection-observer'

const DocumentsPage = () => {
  const [queryObject, setQueryObject] = useState(baseQuery)

  //this swr api is in beta, docs limited
  //"hasMore" like condition not applicable to searchapi ath this point. count returns total resource count only...
  const {data, size, setSize} = useSWRInfinite(index => {
    const limit = 2
    const queryObjectWithPaginationParams = {
      ...queryObject,
      limit,
      skip: index * limit,
    }
    return `/Documents?filter=${parseObjectToUri(
      queryObjectWithPaginationParams
    )}`
  })
  const documents = data ? [].concat(...data) : []
  const loadMore = () => (size > 0 ? setSize(size + 1) : setSize(2)) //garbage

  //this is broken garbage, should trigger lazy loading using observer api, react-window/virtualized should be used instead
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


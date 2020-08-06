import React, {Suspense, useCallback, useEffect, useState} from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import {Box} from 'rebass/styled-components'
import styled from 'styled-components'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import Search from '../Search/search'
import Document from './document'

//I do not fancy this component, will be replaced...

const DocumentsPage = () => {
  const limit = 10 //no. of items per "page"

  const [queryObject, setQueryObject] = useState(baseQuery)
  console.log(queryObject)
  //new SWR's api in beta, shouldn't change though
  const {data, setSize} = useSWRInfinite(index => {
    const paginatedQueryObject = {
      ...queryObject,
      limit,
      skip: index * limit,
    }
    //convert the complete query object to uri
    return `/Documents?filter=${parseObjectToUri(paginatedQueryObject)}`
  })
  const documents = data ? [].concat(...data) : [] //merge paginated chunks into one dimensional array

  const loadMore = useCallback(() => setSize(size => size + 1), [setSize])

  //search api doesnt return item count at this point
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    data[data.length - 1].length || setHasMore(false)
  }, [data, setHasMore])

  return (
    <S.Box>
      <Search setQueryObject={setQueryObject} />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <InfiniteScroll
            dataLength={documents.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<Spinner />}
          >
            {documents.map(document => (
              <Document key={document.pid} document={document} />
            ))}
          </InfiniteScroll>
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

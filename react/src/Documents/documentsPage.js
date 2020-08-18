import React, {Suspense, useCallback, useEffect, useState} from 'react'

import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import {Box} from 'rebass/styled-components'
import styled from 'styled-components'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import Document from './document'

const Search = React.lazy(() => import('../Search/search'))

const DocumentsPage = () => {
  const [queryObject, setQueryObject] = useState(baseQuery)
  const [hasMore, setHasMore] = useState(true)

  const limit = 4

  const {data, setSize} = useSWRInfinite(index => {
    const paginatedQueryObject = {
      ...queryObject,
      limit,
      skip: index * limit,
    }
    return `/Documents?filter=${parseObjectToUri(paginatedQueryObject)}`
  })

  const documents = data ? [].concat(...data) : []
  const loadMore = useCallback(() => setSize(size => size + 1), [setSize])
  const isItemLoaded = index => !hasMore || index < documents.length
  const itemCount = hasMore ? documents.length + 1 : documents.length

  //no pretty count
  //https://github.com/panosc-eu/search-api/issues/46
  useEffect(() => {
    data[data.length - 1].length ? setHasMore(true) : setHasMore(false)
  }, [data, setHasMore])

  const Row = ({index, style}) => (
    <Document
      style={style}
      document={isItemLoaded(index) ? documents[index] : null}
    />
  )

  return (
    <S.Box>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Search setQueryObject={setQueryObject} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <VWindowWrapper>
            <AutoSizer>
              {({height, width}) => (
                <InfiniteLoader
                  isItemLoaded={isItemLoaded}
                  itemCount={itemCount}
                  loadMoreItems={loadMore}
                >
                  {({onItemsRendered, ref}) => (
                    <FixedSizeList
                      height={height}
                      width={width}
                      itemCount={itemCount}
                      onItemsRendered={onItemsRendered}
                      ref={ref}
                      itemSize={300}
                    >
                      {Row}
                    </FixedSizeList>
                  )}
                </InfiniteLoader>
              )}
            </AutoSizer>
          </VWindowWrapper>
        </Suspense>
      </ErrorBoundary>
    </S.Box>
  )
}
export default DocumentsPage

const VWindowWrapper = styled(Box)`
  grid-column: 2/3;
  grid-row: 1/3;
`
const S = {}
S.Box = styled(Box)`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: min-content 1fr;
  height: 90vh;
`

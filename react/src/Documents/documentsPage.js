import React, {Suspense, useCallback, useEffect, useState} from 'react'

import styled from '@emotion/styled'
import css from '@styled-system/css'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import {Box} from '../Primitives'
import Document from './document'

const Search = React.lazy(() => import('../Search/search'))

const DocumentsPage = props => {
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
      document={isItemLoaded(index) && documents[index]}
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
          <S.Wrapper>
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
          </S.Wrapper>
        </Suspense>
      </ErrorBoundary>
    </S.Box>
  )
}
export default DocumentsPage

const S = {}
S.Box = styled(Box)(
  css({
    display: 'grid',
    gridGap: [4],
    gridTemplateColumns: '1fr 3fr',
    gridTemplateRows: 'min-content 1fr',
    height: '100%',
  })
)
S.Wrapper = styled(Box)(
  css({
    gridColumn: '2/3',
    gridRow: '1/3',
  })
)

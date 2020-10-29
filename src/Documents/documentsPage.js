import React, {useRef, Suspense, useCallback, useState, useEffect} from 'react'

import styled from '@emotion/styled'
import css from '@styled-system/css'
import debounce from 'lodash.debounce'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import {Box, Heading} from '../Primitives'
import Document from './document'

const Search = React.lazy(() => import('../Search/search'))

const DocumentsPage = () => {
  const [queryObject, setQueryObject] = useState(baseQuery)
  const limit = 15

  const {data, setSize, error, size} = useSWRInfinite(index => {
    const paginatedQueryObject = {
      ...queryObject,
      limit,
      skip: index * limit,
    }
    return `/Documents?filter=${parseObjectToUri(paginatedQueryObject)}`
  })

  //took some of these from https://swr.vercel.app/examples
  const documents = data ? [].concat(...data) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const hasMore = !!data[data.length - 1].length
  const isItemLoaded = index => !hasMore || index < documents.length

  const itemCount = () => (hasMore ? documents.length + 1 : documents.length)

  const loadMore = useCallback(
    () =>
      isLoadingMore
        ? false
        : data?.[0]?.length === 0 || setSize(size => size + 1),
    [data, setSize, isLoadingMore]
  )

  const Row = ({index, style}) => (
    <Document
      style={style}
      document={isItemLoaded(index) && documents[index]}
    />
  )
  const breakpoints = () => (window.innerWidth < 1550 ? 552 : 300)

  const [scrollPosition, setScrollPosition] = useState(0)
  const [itemSize, setItemSize] = useState(breakpoints())
  const scrollIndex = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      const getItemSize = () => breakpoints()
      const newSize = getItemSize()
      // const offset = scrollIndex.current * newSize
      setItemSize(newSize)
      // setScrollPosition(offset)
    }
    window.addEventListener('resize', debounce(handleResize, 500))
    return () =>
      window.removeEventListener('resize', debounce(handleResize, 500))
  }, [])

  return (
    <S.Box>
      <S.Hidden>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Search setQueryObject={setQueryObject} />
          </Suspense>
        </ErrorBoundary>
      </S.Hidden>
      <S.Wrapper>
        <Heading>Documents</Heading>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <S.MaxHeight>
              <AutoSizer>
                {({height, width}) => (
                  <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount()}
                    loadMoreItems={loadMore}
                  >
                    {({onItemsRendered, ref}) => {
                      return (
                        <FixedSizeList
                          height={height}
                          width={width}
                          itemCount={itemCount()}
                          onItemsRendered={({
                            overscanStartIndex,
                            overscanStopIndex,
                            visibleStartIndex,
                            visibleStopIndex,
                          }) => {
                            onItemsRendered({
                              overscanStartIndex,
                              overscanStopIndex,
                              visibleStartIndex,
                              visibleStopIndex,
                            })
                            scrollIndex.current = visibleStartIndex
                          }}
                          ref={ref}
                          itemSize={itemSize}
                          initialScrollOffset={scrollPosition}
                        >
                          {Row}
                        </FixedSizeList>
                      )
                    }}
                  </InfiniteLoader>
                )}
              </AutoSizer>
            </S.MaxHeight>
          </Suspense>
        </ErrorBoundary>
      </S.Wrapper>
    </S.Box>
  )
}
export default DocumentsPage

const S = {}
S.MaxHeight = styled(Box)(
  css({
    height: '100%',
  })
)
S.Hidden = styled(Box)(
  css({
    '@media (max-width: 1550px)': {
      display: 'none',
    },
  })
)
S.Box = styled(Box)(
  css({
    height: '100%',
    display: 'grid',
    gridGap: [4],
    gridTemplateColumns: '256px 1fr',
    gridTemplateRows: 'min-content 1fr',

    '@media (max-width: 1550px)': {
      gridTemplateColumns: '1fr',
    },
  })
)
S.Wrapper = styled(Box)(
  css({
    gridColumn: '2/3',
    gridRow: '1/3',
    '@media (max-width: 1550px)': {
      gridColumn: '1/2',
    },
  })
)

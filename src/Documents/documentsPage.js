import React, {
  useRef,
  Suspense,
  useCallback,
  useState,
  useLayoutEffect,
  useContext,
} from 'react'

import debounce from 'lodash.debounce'
import AutoSizer from 'react-virtualized-auto-sizer'
import {ThemeContext} from 'styled-components'
import {FixedSizeList} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import styled from 'styled-components'
import {useSWRInfinite} from 'swr'

import useSearchQuery from '../App/useSearchQuery'
import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import {Box, Heading} from '../Primitives'
import Document from './document'

const DocumentsPage = () => {
  const limit = 5

  const initialSize = useSearchQuery(state => state.page)
  const queryObject = useSearchQuery(state => state.query)
  const {data, setSize, error, size} = useSWRInfinite(
    index => {
      const skip = limit * index
      const paginatedQueryObject = {
        ...queryObject,
        limit,
        skip,
      }
      return `/Documents?filter=${parseObjectToUri(paginatedQueryObject)}`
    },
    {initialSize}
  )

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
  const theme = useContext(ThemeContext)
  const handleBreakpoints = useCallback(
    () =>
      window.innerWidth < parseInt(theme.breakpoints[0])
        ? 800
        : window.innerWidth < parseInt(theme.breakpoints[1])
        ? 600
        : 300,
    [theme.breakpoints]
  )

  const [itemSize, setItemSize] = useState(handleBreakpoints())
  const offsetRef = useRef()
  const infiniteLoaderRef = useRef()

  const setPage = useSearchQuery(state => state.setPage)
  const scrollIndex = useSearchQuery(state => state.scrollIndex)
  const setScrollIndex = useSearchQuery(state => state.setScrollIndex)
  useLayoutEffect(() => {
    const handleResize = () => {
      const newSize = handleBreakpoints()
      const handleScrollOffset = () => {
        const targetIndex = offsetRef.current
        setItemSize(newSize)
        itemSize !== newSize &&
          infiniteLoaderRef.current._listRef.scrollToItem(targetIndex)
        console.log(window.innerWidth)
      }
      handleScrollOffset()
    }
    window.addEventListener('resize', debounce(handleResize, 500))
    return () => {
      window.removeEventListener('resize', debounce(handleResize, 500))
      setPage(size)
      setScrollIndex(offsetRef.current)
    }
  }, [setPage, setScrollIndex, size, handleBreakpoints, itemSize])

  return (
    <ErrorBoundary>
      <Heading>Documents</Heading>
      <Suspense fallback={<Spinner />}>
        <S.MaxHeight>
          <AutoSizer>
            {({height, width}) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount()}
                loadMoreItems={loadMore}
                ref={infiniteLoaderRef}
              >
                {({onItemsRendered, ref}) => {
                  return (
                    <FixedSizeList
                      height={height}
                      width={width}
                      itemCount={itemCount()}
                      onItemsRendered={({
                        visibleStartIndex,
                        visibleStopIndex,
                      }) => {
                        onItemsRendered({
                          visibleStartIndex,
                          visibleStopIndex,
                        })
                        offsetRef.current = Math.round(
                          (visibleStartIndex + visibleStopIndex) / 2 - 1
                        )
                      }}
                      itemSize={itemSize}
                      ref={ref}
                      initialScrollOffset={scrollIndex * itemSize}
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
  )
}
export default DocumentsPage

const S = {}
S.MaxHeight = styled(Box).attrs({
  height: '100%',
})``
S.Hidden = styled(Box).attrs({})`
  @media (max-width: ${({theme}) => theme.breakpoints[2]}) {
    display: none;
  }
`
S.Box = styled(Box).attrs({
  sx: {
    height: '100%',
    display: 'grid',
    gridGap: [4],
    gridTemplateColumns: '256px 1fr',
    gridTemplateRows: 'min-content 1fr',
  },
})`
  @media screen and (max-width: ${({theme}) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
  }
`

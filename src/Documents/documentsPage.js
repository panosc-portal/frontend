import React, {
  useRef,
  Suspense,
  useCallback,
  useState,
  useLayoutEffect,
  useContext,
} from 'react'

import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import {ThemeContext} from 'styled-components'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useDocumentsStore, useSearchStore} from '../App/stores'
import {Box, Heading} from '../Primitives'
import Document from './document'

const DocumentsPage = () => {
  // Data Fetching
  const limit = 5

  const initialSize = useDocumentsStore(state => state.page)
  const queryObject = useSearchStore(state => state.query)

  const {data, setSize, error, size} = useSWRInfinite(
    index => {
      const skip = limit * index
      const paginatedQueryObject = {
        ...queryObject,
        limit,
        skip,
      }
      const parseParameters = paramsObject =>
        encodeURIComponent(JSON.stringify(paramsObject))
      return `/Documents?filter=${parseParameters(paginatedQueryObject)}`
    },
    {initialSize}
  )

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

  // Single Document
  const Row = ({index, style}) => (
    <Document
      style={style}
      document={isItemLoaded(index) && documents[index]}
    />
  )

  //Breakpoints in virtual list
  const theme = useContext(ThemeContext)

  const handleBreakpoints = useCallback(() => {
    const breakpoints = []
    theme.breakpoints.map(breakpoint => breakpoints.push(parseInt(breakpoint)))
    const width = window.innerWidth / 10
    return width < breakpoints[0] ? 1000 : width < breakpoints[1] ? 800 : 300
  }, [theme.breakpoints])

  const [itemSize, setItemSize] = useState(handleBreakpoints())

  const infiniteLoaderRef = useRef()

  //Remember Scroll Position
  const setInitialSize = useDocumentsStore(state => state.setPage)
  const scrollIndex = useDocumentsStore(state => state.scrollIndex)
  const setScrollIndex = useDocumentsStore(state => state.setScrollIndex)

  const getIndex = useCallback(
    ref =>
      ref.current
        ? Math.round(
            (ref.current._lastRenderedStartIndex +
              ref.current._lastRenderedStopIndex) /
              2
          )
        : 0,
    []
  )
  const scrollToPlace = useCallback(
    ref => {
      const index = getIndex(ref)
      ref.current && ref.current._listRef.scrollToItem(index, 'center')
    },
    [getIndex]
  )

  //Automaticaly start list where left off
  const initialOffset = scrollIndex * itemSize

  //Rescroll back to view after resizing window
  useLayoutEffect(() => {
    const handleResize = () => {
      const newSize = handleBreakpoints()
      itemSize !== newSize && setItemSize(newSize)
    }
    window.addEventListener('resize', debounce(handleResize, 500))
    return () => {
      scrollToPlace(infiniteLoaderRef)
      window.removeEventListener('resize', debounce(handleResize, 500))
    }
  }, [scrollToPlace, handleBreakpoints, itemSize])

  //Update indexes to store (throttled)
  const updateIndexes = () => {
    const index = getIndex(infiniteLoaderRef)
    index !== scrollIndex && index !== 0 && setScrollIndex(index)
    initialSize !== size && setInitialSize(size)
  }

  return (
    <ErrorBoundary>
      <Heading>Documents</Heading>
      <Suspense fallback={<Spinner />}>
        <Box height="100%">
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
                      onScroll={throttle(updateIndexes, 1000)}
                      itemCount={itemCount()}
                      onItemsRendered={onItemsRendered}
                      itemSize={itemSize}
                      ref={ref}
                      initialScrollOffset={initialOffset}
                    >
                      {Row}
                    </FixedSizeList>
                  )
                }}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </Box>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsPage

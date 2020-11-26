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
    return () =>
      window.removeEventListener('resize', debounce(handleResize, 500))
  }, [handleBreakpoints, itemSize])

  return (
    <S.Box>
      <S.Hidden>
        <Heading>Search</Heading>
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
S.Wrapper = styled(Box).attrs({
  sx: {
    gridColumn: '2/3',
    gridRow: '1/3',
  },
})`
  @media (max-width: ${({theme}) => theme.breakpoints[2]}) {
    grid-column: 1/2;
  }
`

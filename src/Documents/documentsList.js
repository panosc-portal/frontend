import React, {Suspense, useCallback, useEffect} from 'react'

import {values, map, view, lensPath, pipe} from 'ramda'
import {isEmpty} from 'ramda'
import useInView from 'react-cool-inview'
import parser from 'search-query-generator'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useDocumentsStore, useSearchNStore} from '../App/stores'
import useScrollPosition from '../App/useScrollPos'
import Column from '../Layout/column'
import {Button, Box} from '../Primitives'
import {generatorFilter, parseToExternal} from '../Search/new'
import {useSearchNStore as useNew} from '../Search/store'
import Document from './document'

const DocumentsList = ({isShowing, name}) => {
  const limit = 50

  const initialSize = useDocumentsStore((state) => state.page)
  const setInitialSize = useDocumentsStore((state) => state.setPage)
  const filters = useNew()
  console.log(filters)
  // const extFilters = parseToExternal(filters)

  const {data, setSize, error, size} = useSWRInfinite(
    (index) => {
      const skip = limit * index
      const config = {
        include: [
          ['datasets'],
          ['members', 'affiliation'],
          ['members', 'person'],
        ],
        limit,
        skip,
      }
      const filters = []
      const query = parser(config, filters)
      console.log(query)
      return `/Documents?filter=${query}`
    },
    {initialSize},
  )

  const documents = data ? [].concat(...data) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const hasMore = data[data.length - 1]?.length > limit
  const loadMore = useCallback(
    () =>
      isLoadingMore || data?.[0]?.length === 0 || setSize((size) => size + 1),
    [data, setSize, isLoadingMore],
  )

  const {ref} = useInView({
    rootMargin: '100px 0px',
    onEnter: ({observe, unobserve}) => {
      unobserve()
      hasMore && (isLoadingMore || loadMore())
      observe()
    },
  })
  // const updateInitalSize = useCallback(() => {
  //   setInitialSize(size)
  // }, [setInitialSize, size])

  // useEffect(() => {
  //   return () => {
  //     updateInitalSize()
  //   }
  // }, [updateInitalSize])

  const notShowed = isShowing.name !== name
  // useScrollPosition(isLoadingInitialData || notShowed)
  const pF = values(filters.parameters.filters)
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Column>
          <Box>
            {pF.map((f) => (
              <Button key={f.id} onClick={(e) => f.actions.toggleIsActive(e)}>
                Toggle 1
              </Button>
            ))}
            <Button onClick={() => filters.parameters.toggleOperator(330)}>
              Toggle 2
            </Button>
            {/* <Button onClick={(e) => toggleIsActive('parameters')(3)(e)}> */}
            {/*   Toggle 3 */}
            {/* </Button> */}
          </Box>
          {isEmpty(documents) ? (
            <Box>Nothing to display.</Box>
          ) : (
            documents.map((document) => (
              <Document document={document} key={document.pid} />
            ))
          )}
          {hasMore && <Box ref={ref}>Loading...</Box>}
        </Column>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsList

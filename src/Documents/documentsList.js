import React, {Suspense, useCallback, useEffect} from 'react'

import useInView from 'react-cool-inview'
import {useSWRInfinite} from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useDocumentsStore, useSearchStore} from '../App/stores'
import useScrollPosition from '../App/useScrollPos'
import Column from '../Layout/column'
import {Box} from '../Primitives'
import Document from './document'

const DocumentsList = ({isShowing, name}) => {
  const notShowed = isShowing !== name
  // Data Fetching
  const limit = 5

  const initialSize = useDocumentsStore(state => state.page)
  const setInitialSize = useDocumentsStore(state => state.setPage)
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

  const loadMore = useCallback(
    () => isLoadingMore || data?.[0]?.length === 0 || setSize(size => size + 1),
    [data, setSize, isLoadingMore]
  )

  const {ref} = useInView({
    rootMargin: '100px 0px',
    onEnter: ({observe, unobserve}) => {
      unobserve()
      hasMore && (isLoadingMore || loadMore())
      observe()
    },
  })
  const updateInitalSize = useCallback(() => {
    setInitialSize(size)
  }, [setInitialSize, size])

  useEffect(() => {
    return () => {
      updateInitalSize()
    }
  }, [updateInitalSize])

  useScrollPosition(isLoadingInitialData || notShowed)

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Column>
          {documents?.map(document => (
            <Document document={document} key={document.pid} />
          ))}
          {hasMore && <Box ref={ref}>Loading...</Box>}
        </Column>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsList

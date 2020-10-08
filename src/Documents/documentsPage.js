import React, {Suspense, useCallback, useState} from 'react'

import styled from '@emotion/styled'
import css from '@styled-system/css'
import {Virtuoso} from 'react-virtuoso'
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
  const loadMore = useCallback(
    () =>
      isLoadingMore
        ? false
        : data?.[0]?.length === 0 || setSize(size => size + 1),
    [data, setSize, isLoadingMore]
  )

  return (
    <S.Box>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Search setQueryObject={setQueryObject} />
        </Suspense>
      </ErrorBoundary>
      <S.Wrapper>
        <Heading>Documents</Heading>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {/*Virtuoso supports dynamic height of items in the list,
		  performance wise it's inferior to react-window :-/ */}
            <Virtuoso
              totalCount={documents.length}
              item={index => (
                <Document
                  key={documents[index].pid}
                  document={documents[index]}
                />
              )}
              overscan={3000}
              endReached={() => loadMore()}
              footer={() => isLoadingMore && <Spinner />}
            />
          </Suspense>
        </ErrorBoundary>
      </S.Wrapper>
    </S.Box>
  )
}
export default DocumentsPage

const S = {}
S.HeightBox = styled(Box)(
  css({
    height: '100%',
  })
)
S.Box = styled(S.HeightBox)(
  css({
    display: 'grid',
    gridGap: [4],
    gridTemplateColumns: '256px 1fr',
    gridTemplateRows: 'min-content 1fr',
  })
)
S.Wrapper = styled(Box)(
  css({
    gridColumn: '2/3',
    gridRow: '1/3',
  })
)

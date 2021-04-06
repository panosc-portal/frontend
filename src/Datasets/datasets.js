import React, {Suspense} from 'react'

import css from '@styled-system/css'
import styled from 'styled-components'
import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import Dataset from '../Datasets/dataset'
import Layout from '../Layout/column'

const Datasets = (props) => {
  const documentId = decodeURIComponent(
    props.match?.params.documentId ?? props.documentId,
  )
  const query = {
    where: {
      documentId,
    },
    include: [{relation: 'instrument'}],
  }
  const {data} = useSWR('/Datasets?filter=' + parseObjectToUri(query))

  return (
    <SmallerGaps>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          {data.map((dataset) => (
            <Dataset dataset={dataset} key={dataset.pid} />
          ))}
        </Suspense>
      </ErrorBoundary>
    </SmallerGaps>
  )
}
export default Datasets

const SmallerGaps = styled(Layout)(
  css({
    gap: [1, 1, 2, 3],
  }),
)

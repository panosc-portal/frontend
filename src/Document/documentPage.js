import React, {Suspense} from 'react'

import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import {Heading, Flex, Box, Image, Card} from '../Primitives'
import Document from './document'
import Datasets from '../Datasets/datasets'
import Layout from '../Layout/row'
import Column from '../Layout/column'
import Environments from '../Environments/environments'

const DocumentPage = props => {
  const documentId = props.match.params.documentId
  const query = baseQuery
  query.include[0].scope = {
    include: [{relation: 'instrument'}],
  }

  const {data} = useSWR(
    '/Documents/' + documentId + '?filter=' + parseObjectToUri(query)
  )
  const scaleBig = [1, 1, 1 / 2]
  const scaleSmall = [1, 1, 1 / 4]
  return (
    <Layout>
      <Box width={scaleBig}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Heading variant="display">{data.title}</Heading>
            <Document data={data} />
          </Suspense>
        </ErrorBoundary>
      </Box>

      <Box width={scaleSmall}>
        <Heading variant="display">Datasets</Heading>
        <Column>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Datasets documentId={documentId} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              {data.img && (
                <Box>
                  <Heading variant="display">Visualisation Preview</Heading>
                  <Image src={data.img} />
                </Box>
              )}
            </Suspense>
          </ErrorBoundary>
        </Column>
      </Box>

      <Box width={scaleSmall}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Heading variant="display">Environments</Heading>
            <Environments />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Layout>
  )
}

export default DocumentPage

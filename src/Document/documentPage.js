import React, {Suspense} from 'react'

import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import {Heading, Box, Image} from '../Primitives'
import Document from './document'
import Datasets from '../Datasets/datasets'
import Layout from '../Layout/row'
import Column from '../Layout/column'
import Environments from '../Environments/environments'
import useMobileNav from '../App/mobileNav'

const DocumentPage = props => {
  const documentId = props.match.params.documentId
  const query = baseQuery
  query.include[0].scope = {
    include: [{relation: 'instrument'}],
  }

  const {data} = useSWR(
    '/Documents/' + documentId + '?filter=' + parseObjectToUri(query)
  )

  const DatasetsVisualisation = () => (
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
  )

  const sections = [
    {
      name: 'Document',
      component: <Document data={data} />,
      width: [1, 1, 1 / 2],
    },
    {
      name: 'Datasets',
      component: <DatasetsVisualisation />,
      width: [1, 1, 1 / 4],
    },
    {name: 'Environments', component: <Environments />, width: [1, 1, 1 / 4]},
  ]
  const {AutoArrange} = useMobileNav('Document')
  return (
    <Layout>
      <AutoArrange sections={sections} />
    </Layout>
  )
}

export default DocumentPage

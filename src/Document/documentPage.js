import React, {Suspense} from 'react'

import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import useSidebars from '../App/useSidebars'
import Spinner from '../App/spinner'
import Datasets from '../Datasets/datasets'
import Environments from '../Environments/environments'
import Column from '../Layout/column'
import Layout from '../Layout/row'
import {Heading, Box, Image} from '../Primitives'
import Document from './document'

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
  const {Arrange} = useSidebars('Document')
  return (
    <Layout>
      <Arrange sections={sections} />
    </Layout>
  )
}

export default DocumentPage

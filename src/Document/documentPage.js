import React, {Suspense} from 'react'

import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import {baseQuery, parseObjectToUri} from '../App/helpers'
import Spinner from '../App/spinner'
import useSections from '../App/useSections'
import Datasets from '../Datasets/datasets'
import Environments from '../Environments/environments'
import Layout from '../Layout/row'
import {Heading, Flex, Box, Image} from '../Primitives'
import Document from './document'

const DocumentPage = (props) => {
  const documentId = props.match.params.documentId
  const query = baseQuery
  query.include[0].scope = {
    include: [{relation: 'instrument'}],
  }

  const {data} = useSWR(
    '/Documents/' + documentId + '?filter=' + parseObjectToUri(query),
  )

  const DatasetsVisualisation = () => (
    <Flex
      sx={{
        gap: [3, 2, 3, 4],
        flexWrap: 'no-wrap',
        flexFlow: ['column', 'row', 'column'],
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Box width={[1, 1 / 2, 1]}>
            <Heading variant="display">Datasets</Heading>
            <Datasets documentId={documentId} />
          </Box>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          {data.img && (
            <Box width={[1, 1 / 2, 1]} sx={{}}>
              <Heading variant="display">Visualisation Preview</Heading>
              <Image src={data.img} />
            </Box>
          )}
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )

  const sections = [
    {
      name: data.title,
      component: <Document data={data} />,
      width: [1, 1, 1 / 2],
    },
    {
      name: 'Datasets',
      component: <DatasetsVisualisation />,
      width: [1, 1, 1 / 4],
      hideTitle: true,
    },
    {name: 'Analysis', component: <Environments />, width: [1, 1, 1 / 4]},
  ]
  const {Arrange} = useSections(sections)
  return (
    <Layout>
      <Arrange />
    </Layout>
  )
}

export default DocumentPage

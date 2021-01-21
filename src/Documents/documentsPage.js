import React, {Suspense} from 'react'

import ErrorBoundary from '../App/errorBoundary'
import useSidebars from '../App/useSidebars'
import Spinner from '../App/spinner'
import DocumentsList from '../Documents/documentsList'
import Environments from '../Environments/environments'
import Layout from '../Layout/row'
import Search from '../Search/search'

const DocumentsPage = () => {
  const {Arrange, showed} = useSidebars('Documents')
  const sections = [
    {
      name: 'Search',
      component: <Search />,
      width: [1, 1, 5 / 16, 1 / 5],
    },
    {
      name: 'Documents',
      component: <DocumentsList showed={showed} />,
      width: [1, 1, 6 / 16, 3 / 5],
    },

    {
      name: 'Environments',
      component: <Environments />,
      width: [1, 1, 5 / 16, 1 / 5],
    },
  ]
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Arrange sections={sections} />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsPage

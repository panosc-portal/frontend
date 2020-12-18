import React, {Suspense} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import ErrorBoundary from '../App/errorBoundary'
import useSidebars from '../App/useSidebars'
import Spinner from '../App/spinner'
import DocumentsList from '../Documents/documentsList'
import Environments from '../Environments/environments'
import Layout from '../Layout/row'
import Search from '../Search/search'
import About from '../About/about'

const DocumentsPage = () => {
  const {keycloak} = useKeycloak()
  const sections = [
    {
      name: 'Search',
      component: <Search />,
      width: [1, 1, 5 / 16, 1 / 5],
    },
    {
      name: 'Data',
      component: <DocumentsList name="Data" />,
      width: [1, 1, 6 / 16, 3 / 5],
    },
    keycloak.authenticated
      ? {
          name: 'Environments',
          component: <Environments />,
          width: [1, 1, 5 / 16, 1 / 5],
        }
      : {
          name: 'PaNOSC',
          component: <About />,
          width: [1, 1, 5 / 16, 1 / 5],
        },
  ]
  const {Arrange} = useSidebars(sections, 1)
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Arrange />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsPage

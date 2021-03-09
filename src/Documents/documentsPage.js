import React, {Suspense} from 'react'

import {useKeycloak} from '@react-keycloak/web'

import About from '../About/about'
import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import useSections from '../App/useSections'
import DocumentsList from '../Documents/documentsList'
import Environments from '../Environments/environments'
import Layout from '../Layout/row'
import parser, {filters, config} from '../Search/parser'
import Search from '../Search/search'

//debug

const query = parser(config, filters)
console.log(query)

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
          name: 'Dashboard',
          component: <Environments />,
          width: [1, 1, 5 / 16, 1 / 5],
        }
      : {
          name: 'About',
          component: <About />,
          width: [1, 1, 5 / 16, 1 / 5],
        },
  ]
  const {Arrange} = useSections(sections, 1)
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

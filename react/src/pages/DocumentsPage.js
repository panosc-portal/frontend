import React, {useState} from 'react'
import styled from 'styled-components'
import {H1} from '../components/Commons'
import DocumentList from '../components/DocumentList'
import Instances from '../components/newInstances'
// import SearchQuery from '../components/SearchQuery'
import SearchQuery from '../components/newSearchQuery.js'
import {DragDropContext} from 'react-beautiful-dnd'
import {useFreshInstances} from '../utils/useApi.js'

const DocumentsPage = () => {
  const [
    {data: instances, isLoading: isLoadingInstances},
    setAddNewInstance
  ] = useFreshInstances()
  const initialQuery = {
    include: [
      {
        relation: 'datasets'
      },
      {
        relation: 'members',
        scope: {
          include: [
            {
              relation: 'affiliation'
            },
            {
              relation: 'person'
            }
          ]
        }
      }
    ]
  }

  const [query, setQuery] = useState(initialQuery)
  return (
    <Layout>
      <Search>
        <H1>Search Query</H1>
        <SearchQuery setQuery={setQuery} />
      </Search>
	  {/*      <DragDropContext>
        <Environments>
          <H1>Environments</H1>
          {isLoadingInstances || (
            <Instances
              instances={instances}
              setAddNewInstance={setAddNewInstance}
            />
          )}
      </DragDropContext>
        </Environments> */}
        <Documents>
          <H1>Documents</H1>
          <DocumentList query={query} />
        </Documents>
    </Layout>
  )
}

export default DocumentsPage

const Layout = styled.div`
  margin: 0 5.5rem;
  display: grid;
  grid-template-columns: 20rem minmax(60rem, 1fr);
  grid-template-rows: repeat(2, min-content) 1fr;
  grid-gap: var(--dist);
`

const Documents = styled.section`
  grid-row: 1/-1;
  grid-column: 2/3;
`

const Search = styled.section``

const Environments = styled.section``

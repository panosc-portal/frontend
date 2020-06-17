import React, {useState} from 'react'
import styled from 'styled-components'
import DocumentList from '../components/DocumentList'
import {Heading} from 'rebass'
import Instances from '../components/newInstances'
// import SearchQuery from '../components/SearchQuery'
import SearchQuery from '../components/newSearchQuery'
import {DragDropContext} from 'react-beautiful-dnd'
import {useFreshInstances} from '../utils/useApi'

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
        <Heading>Search Query</Heading>
        <SearchQuery setQuery={setQuery} />
      </Search>
      {/*      <DragDropContext>
        <Environments>
          <Heading>Environments</Heading>
          {isLoadingInstances || (
            <Instances
              instances={instances}
              setAddNewInstance={setAddNewInstance}
            />
          )}
      </DragDropContext>
        </Environments> */}
      <Documents>
        <Heading>Documents</Heading>
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

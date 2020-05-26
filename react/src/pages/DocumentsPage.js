import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {H1} from '../components/Commons'
import DocumentList from '../components/DocumentList'
import Instances from '../components/newInstances'
import SearchQuery from '../components/SearchQuery'
import {DragDropContext} from 'react-beautiful-dnd'
import Api from '../utils/api'

const DocumentsPage = () => {
  const [instances, setInstances] = useState([])
  const [isLoadingInstances, setIsLoadingInstances] = useState(true)
  const [addNewInstance, setAddNewInstance] = useState({})

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Api.get('/instances')
        setInstances(res.data)
        setIsLoadingInstances(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [addNewInstance])
  return (
    <Layout>
      <Search>
        <H1>Search Query</H1>
        <SearchQuery />
      </Search>
      <DragDropContext>
        <Environments>
          <H1>Environments</H1>
          {isLoadingInstances || (
            <Instances
              instances={instances}
              setAddNewInstance={setAddNewInstance}
            />
          )}
        </Environments>
        <Documents>
          <H1>Documents</H1>
          <DocumentList />
        </Documents>
      </DragDropContext>
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

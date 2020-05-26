import React, {useState, useEffect} from 'react'
import {useFetch} from '../utils'
import styled from 'styled-components'
import {H1, H2} from '../components/Commons'
import Document from '../components/Document'
import Datasets from '../components/Datasets'
// import Instances from "../components/Instances";
import Loading from '../components/Loading'
import {DragDropContext} from 'react-beautiful-dnd'
import useApi from '../utils/useApi'
import Instances from '../components/newInstances'
import Api from '../utils/api'
import useSearchApi from '../utils/useSearchApi'

const DocumentPage = (props) => {
  // documents
  // const {data, isLoading} = useApi({
  //   path: '/documents/' + props.match.params.document
  // })
  const pid = props.match.params.pid1 + '/' + props.match.params.pid2
  const singleQuery = {
    where: {
      pid: pid
    },
    include: [
      {
        relation: 'datasets',
        scope: {
          include: [{relation: 'instrument'}]
        }
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
  console.log('pid: ' + pid)
  const {data, isLoading, hasError} = useSearchApi('Documents', singleQuery)
  //instances
  const [instances, setInstances] = useState([])
  const [isLoadingInstances, setIsLoadingInstances] = useState(true)
  const [AddNewInstance, setAddNewInstance] = useState({})

  const [addDataset, setAddDataset] = useState({})
  const pushDataset = (result) => {
    const payload = {
      dataset: result.draggableId,
      instance: result.destination.droppableId
    }
    setAddDataset({...payload})
  }

  useEffect(() => {
    const fetch = async () => {
      if (addDataset.dataset) {
        try {
          const add = await Api.post(
            `/instances/${addDataset.instance}/${addDataset.dataset}`
          )
          console.log(add)
        } catch (err) {
          console.log(err)
        }
      }
      try {
        const res = await Api.get('/instances')
        setInstances(res.data)
        setIsLoadingInstances(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [addDataset, AddNewInstance])
  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <H1>{data.title}</H1>
            <Document document={data[0]} />
            {console.log(data)}
          </section>
        )}
        <DragDropContext onDragEnd={pushDataset}>
          <DatasetSection>
            <H1>Datasets</H1>
            {isLoading ? <Loading /> : <Datasets datasets={data[0].datasets} />}
          </DatasetSection>
          <Environments>
            <H1>Environments</H1>
            {isLoadingInstances || (
              <Instances
                instances={instances}
                setAddNewInstance={setAddNewInstance}
              />
            )}
          </Environments>
        </DragDropContext>
      </Layout>
    </>
  )
}

export default DocumentPage

const Layout = styled.div`
  margin: 0 5.5rem;
  display: grid;
  grid-template-columns: minmax(42rem, 1fr) repeat(2, 19rem);
  grid-template-rows: min-content 1fr;
  grid-gap: var(--dist);
`

const DatasetSection = styled.section``

const Environments = styled.section``

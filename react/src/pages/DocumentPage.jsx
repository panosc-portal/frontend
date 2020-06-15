import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {H1} from '../components/Commons'
import Document from '../components/Document'
import Datasets from '../components/Datasets'
import Loading from '../components/Loading'
import {DragDropContext} from 'react-beautiful-dnd'
import Instances from '../components/newInstances'
import {
  useSearchApi,
  fakeCloudService,
  useFreshInstances
} from '../utils/useApi'

//these are very awkward lines of garbage, please dont look ;-)

const DocumentPage = (props) => {
  const pid = decodeURIComponent(props.match.params.documentId)
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
  const {data, isLoading} = useSearchApi('Documents', singleQuery)
  const [addDataset, setAddDataset] = useState({})
  const pushDataset = (result) => {
    if (
      result.destination &&
      result.destination.droppableId !== 'datasets' &&
      result.destination.droppableId !== 'analysis'
    ) {
      const payload = {
        dataset: result.draggableId,
        instance: result.destination.droppableId
      }
      setAddDataset({...payload})
    }
  }
  const [
    {data: instances, isLoading: isLoadingInstances},
    setAddNewInstance
  ] = useFreshInstances()
  console.log(`ll: ${isLoadingInstances}, dd: ${instances}`)
  useEffect(() => {
    const fetch = async () => {
      if (addDataset.dataset) {
        try {
          await fakeCloudService.post(
            `instances/${addDataset.instance}/${encodeURIComponent(
              addDataset.dataset
            )}`
          )
          setAddNewInstance({yo: 'yo'})
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetch()
  }, [addDataset, setAddNewInstance])

  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <H1>{data[0].title}</H1>
            <Document document={data[0]} />
          </section>
        )}
        <DragDropContext onDragEnd={pushDataset}>
          <DatasetSection>
            <H1>Datasets</H1>
            {isLoading ? (
              <Loading />
            ) : (
              <Datasets datasets={data[0].datasets.slice(1)} />
            )}
          </DatasetSection>
          <Environments>
            <Analysis>
              <H1>Analysis</H1>
              <BoxCategory>
                <h2>Original Analysis</h2>
              </BoxCategory>
              {isLoading ? (
                <Loading />
              ) : (
                <Datasets datasets={[data[0].datasets[0]]} analysis />
              )}
            </Analysis>
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
  grid-template-columns: minmax(42rem, 1fr) repeat(2, 22rem);
  grid-template-rows: min-content 1fr;
  grid-gap: var(--dist);
`

const DatasetSection = styled.section``

const Environments = styled.section``
const Analysis = styled.p``
const BoxCategory = styled.div`
  h2 {
    font-size: 1rem;
  }
  background-color: var(--color-bg-1);
  margin-bottom: var(--dist-smaller);
  margin-top: var(--dist);
  padding: var(--dist-small) var(--dist);
`

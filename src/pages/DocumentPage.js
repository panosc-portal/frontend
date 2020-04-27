import React, { useState, useEffect } from "react";
import { useFetch } from "../utils";
import styled from "styled-components";
import { H1, H2 } from "../components/Commons";
import Document from "../components/Document";
import Datasets from "../components/Datasets";
// import Instances from "../components/Instances";
import Loading from "../components/Loading";
import { DragDropContext } from "react-beautiful-dnd";
import useApi from "../utils/useApi"
import Instances from "../components/newInstances"
import Api from "../utils/api"

const DocumentPage = props => {
  // documents
  const { data, isLoading } = useApi({ path: "/documents/" + props.match.params.document })

  //instances
  const [instances, setInstances] = useState([])
  const [isLoadingInstances, setIsLoadingInstances] = useState(true)
  const [AddNewInstance, setAddNewInstance] = useState({})


  const [addDataset, setAddDataset] = useState({})
  const pushDataset = result => {
    const payload = { dataset: result.draggableId, instance: result.destination.droppableId }
    setAddDataset({ ...payload })
  }

  useEffect(() => {
    const fetch = async () => {
      if (addDataset.dataset) {
        try {
          const add = await Api.post(`/instances/${addDataset.instance}/${addDataset.dataset}`)
          console.log(add)
        } catch (err) {
          console.log(err)
        }
      }
      try {
        const res = await Api.get("/instances")
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
        {isLoading ? <Loading /> : (<section><H1>{data.title}</H1><Document document={data} /></section>)}
        <DragDropContext onDragEnd={pushDataset}>
          <DatasetSection>
            <H1>Datasets</H1>
            {isLoading ? (
              <Loading />
            ) : (
                <Datasets datasets={data.datasets} />
              )}
          </DatasetSection>
          <Environments>
            <H1>Environments</H1>
            {isLoadingInstances || <Instances instances={instances} setAddNewInstance={setAddNewInstance} />}
          </Environments>
        </DragDropContext>
      </Layout>
    </>
  );
};

export default DocumentPage;

const Layout = styled.div`
margin: 0 5.5rem;
  display: grid;
  grid-template-columns: minmax(42rem, 1fr) repeat(2, 19rem);
  grid-template-rows: min-content 1fr;
  grid-gap: var(--dist);
`;

const DatasetSection = styled.section``;

const Environments = styled.section``;

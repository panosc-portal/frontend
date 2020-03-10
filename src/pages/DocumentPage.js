import React from "react";
import { useFetch } from "../utils";
import styled from "styled-components";
import { H1, H2 } from "../components/Commons";
import Document from "../components/Document";
import Datasets from "../components/Datasets";
import Instances from "../components/Instances";
import Loading from "../components/Loading";

const DocumentPage = props => {
  const { data, isLoading } = useFetch(
    "documents/" + props.match.params.document
  );
  return (
    <>
      <H1>{isLoading ? "Loading..." : data.title}</H1>
      <Layout>
        <div>{isLoading ? <Loading /> : <Document document={data} />}</div>
        <DatasetSection>
          <H2>Datasets</H2>
          {isLoading ? (
            <Loading />
          ) : (
            <Datasets datasets={data.datasets} documentId={data.id} />
          )}
        </DatasetSection>
        <Environments>
          <H2>Environments</H2>
          <Instances />
        </Environments>
      </Layout>
    </>
  );
};

export default DocumentPage;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(42rem, 1fr) repeat(2, 19rem);
  grid-template-rows: min-content 1fr;
  grid-gap: var(--dist);
`;

const DatasetSection = styled.section``;

const Environments = styled.section``;

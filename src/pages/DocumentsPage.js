import React from "react";
import styled from "styled-components";
import { H1 } from "../components/Commons";
import DocumentList from "../components/DocumentList";
import Instances from "../components/Instances";
import SearchQuery from "../components/SearchQuery";

const DocumentsPage = () => (
  <Layout>
    <Search>
      <H1>Search Query</H1>
      <SearchQuery />
    </Search>
    <Environments>
      <H1>Environments</H1>
      <Instances />
    </Environments>
    <Documents>
      <H1>Documents</H1>
      <DocumentList />
    </Documents>
  </Layout>
);

export default DocumentsPage;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 20rem minmax(60rem, 1fr);
  grid-template-rows: repeat(2, min-content) 1fr;
  grid-gap: var(--dist);
`;

const Documents = styled.section`
  grid-row: 1/-1;
  grid-column: 2/3;
`;

const Search = styled.section``;

const Environments = styled.section``;

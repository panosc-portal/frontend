import React from "react";
import { useFetch } from "../../utils";
import Loading from "../loading";
import { DatasetIntro, DatasetMeta, DatasetAnalysis, Container } from "./View";

const Dataset = props => {
  const id = props.match.params.number;
  const { data, isLoading } = useFetch("datasets/" + parseInt(id));
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <DatasetIntro
            name={data.name}
            description={data.description}
            filters={data.filters}
          />
          <DatasetMeta picture={data.img} />
          <DatasetAnalysis />
        </Container>
      )}
    </>
  );
};
export default Dataset;

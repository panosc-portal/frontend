import React from "react";
import Loading from "./Loading";
import { useFetch } from "../utils";
import { NoUl, Li, H3 } from "./Commons";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Datasets = ({ datasets, documentId }) => {
  const { data, isLoading } = useFetch(
    "dd?_expand=dataset&documentId=" + documentId
  );
  const Dataset = ({ d, index }) => (
    <Draggable draggableId={d.dataset.id.toString()} index={index}>
      {provided => (
        <Li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <H3>{d.dataset.title}</H3>
          <div>Created {d.dataset.creationDate}</div>
          <div>{d.dataset.isPublic ? "Public" : "Classified"}</div>
          <div>{d.dataset.size} MB</div>
          <div>
            Instrument: {d.dataset.instrument.name} @{" "}
            {d.dataset.instrument.facility}
          </div>
        </Li>
      )}
    </Draggable>
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Droppable droppableId="datasets">
          {provided => (
            <NoUl ref={provided.innerRef} {...provided.droppableProps}>
              {data.map((d, index) => (
                <Dataset d={d} index={index} key={d.dataset.id} />
              ))}
              {provided.placeholder}
            </NoUl>
          )}
        </Droppable>
      )}
    </>
  );
};

export default Datasets;

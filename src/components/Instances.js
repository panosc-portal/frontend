import React, { useContext } from "react";
import { useFetch } from "../utils/useFetch";
import Loading from "./Loading";
import { TabContext } from "../context/TabContext";
import styled from "styled-components";
import { NoUl, H3 } from "./Commons";
import { Droppable } from "react-beautiful-dnd";

const Instance = ({ instance, provided, dropDataset }) => {
  const { openTab } = useContext(TabContext);
  return (
    <div>
      <H3 onClick={() => openTab(instance)}>{instance.name}</H3>
      <div>{instance.description}</div>
      <b>Flavour:</b>
      <div>
        {instance.flavour.type} - {instance.flavour.name} [CPU:{" "}
        {instance.flavour.cpu} | GPU: {instance.flavour.gpu}]
      </div>
          <b>Datasets:</b>
          <NoUl>
            {instance.datasets.map(dataset => (
              <li key={dataset._id}>
                <i>{dataset.title}</i>
              </li>
            ))}
            {provided.placeholder}
            {dropDataset && (
              <li key={dropDataset._id}>
              <i>{dropDataset.title}</i>
            </li>
            )}
          </NoUl>
    </div>
  );
};

const Instances = props => {
  const { data, isLoading } = useFetch("instances");
  const { tabs } = useContext(TabContext);
  const tabIds = tabs.map(i => i.id).reduce((acc, item) => [...acc, item], []);
  return (
    <NoUl>
      {isLoading ? (
        <Loading />
      ) : (
        data.map(e => (
          <Droppable key={e._id} droppableId={e._id}>
            {provided => (
              <LiInstance
                active={tabIds.includes(e._id)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Instance instance={e} provided={provided} dropDataset={props.dropDataset && e._id === props.dropDataset.destinationId && props.dropDataset} />
              </LiInstance>
            )}
          </Droppable>
        ))
      )}
    </NoUl>
  );
};

export default Instances;

const LiInstance = styled.li`
  background-color: ${props =>
    props.active ? "var(--color-bg-2)" : "var(--color-bg-1)"};
  margin-bottom: var(--dist);
  padding: var(--dist);
`;

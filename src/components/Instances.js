import React, { useContext } from "react";
import { useFetch } from "../utils/useFetch";
import Loading from "./Loading";
import { TabContext } from "../context/TabContext";
import styled from "styled-components";
import { NoUl, H3 } from "./Commons";
import { Droppable } from "react-beautiful-dnd";

const Instance = ({ instance, provided }) => {
  const { data, isLoading } = useFetch(
    "di?_expand=dataset&instanceId=" + instance.id
  );
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <b>Datasets:</b>

          <NoUl>
            {data.map(di => (
              <li key={di.id}>
                <i>{di.dataset.title}</i>
              </li>
            ))}
            {provided.placeholder}
          </NoUl>
        </>
      )}
    </div>
  );
};

const Instances = props => {
  const { data, isLoading } = useFetch("instances?_expand=flavour&userId=1");
  const { tabs } = useContext(TabContext);
  const tabIds = tabs.map(i => i.id).reduce((acc, item) => [...acc, item], []);
  return (
    <NoUl>
      {isLoading ? (
        <Loading />
      ) : (
        data.map(e => (
          <Droppable key={e.id} droppableId={e.id.toString()}>
            {provided => (
              <LiInstance
                active={tabIds.includes(e.id)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Instance instance={e} provided={provided} />
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

import React, { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import { TabContext } from "../context/TabContext";
import styled from "styled-components";
import { NoUl, H3 } from "./Commons";
import { Droppable } from "react-beautiful-dnd";
import useApi from "../utils/useApi"

const Instance = ({ instance, provided, dropDataset }) => {
  const { openTab } = useContext(TabContext);

  return (
    <div>
      <a href="http://localhost:8888/lab" target="_blank"><H3>{instance.name}</H3></a>
      {/* <H3 onClick={() => openTab(instance)}>{instance.name}</H3> */}
      <div>
        {instance.flavour.type} - {instance.flavour.name}
      </div>
      <b>Datasets:</b>
      <ul>
        {instance.datasets.map(dataset => (
          <li key={dataset._id}>
            <i>{dataset.title}</i>
          </li>
        ))}
        {provided.placeholder}
      </ul>
    </div>
  );
};

const Instances = props => {
  const [fetch, setFetch] = useState({ path: "/instances" })
  const { data, isLoading } = useApi(fetch);
  const { tabs } = useContext(TabContext);
  const tabIds = tabs.map(i => i.id).reduce((acc, item) => [...acc, item], []);
  const [call, setCall] = useState({})
  const { isLoading: isAddingDataset } = useApi(call)
  useEffect(() => {
    if (props.dropDataset) {
      setCall({ path: `/instances/${props.dropDataset.instance}/${props.dropDataset.dataset}`, method: 'post' })
      setFetch({ path: "/instances" })
      console.log("yo")
    }
  }, [props.dropDataset])
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
                  <Instance instance={e} provided={provided} dropDataset={props.dropDataset && (e._id === props.dropDataset.instance) && props.dropDataset} />
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

import React, { useContext, useEffect, useState } from "react";
import { useFetch } from "../utils/useFetch";
import Loading from "./Loading";
import { TabContext } from "../context/TabContext";
import styled from "styled-components";
import { NoUl, H3 } from "./Commons";
import { Droppable } from "react-beautiful-dnd";
import useApi from "../utils/useApi"

const Instance = ({ instance, provided, dropDataset }) => {
  const { openTab } = useContext(TabContext);
  // const [call, setCall] = useState({trigger: false})
  // const { response } = useApi(call)
  // call.trigger && setCall({trigger: false})
  // useEffect(() => {
  //   dropDataset && setCall({path: `/${instance._id}/${dropDataset._id}`, method: 'post', data: "", trigger: true})
  // }, [dropDataset, instance._id])

  return (<>
    <div>
      <H3 onClick={() => openTab(instance)}>{instance.name}</H3>
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
            {dropDataset && (
              <li key={dropDataset._id}>
              <i>{dropDataset.title}</i>
            </li>
            )}
          </ul>
    </div></>
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

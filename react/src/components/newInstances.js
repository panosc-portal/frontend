import React from 'react'
import styled from 'styled-components'
import {Div, NoUl, H3} from './Commons'
import {Droppable} from 'react-beautiful-dnd'
import AddInstance from './AddInstance'
import {useSearchApi} from '../utils/useApi.js'

const Instance = ({instance, provided}) => {
  const datasetIds = instance.datasets.reduce(
    (acc, val) => [...acc, {pid: val}],
    []
  )
  const query = {
    where: {
      or: datasetIds
    }
  }
  const {data: datasets, isLoading} = useSearchApi('Datasets', query)
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div>
          <a
            href="http://localhost:8888/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <H3>{instance.name}</H3>
          </a>
          <div>
            Type: <Type>{instance.flavour.type}</Type>
            <br />
            Flavour: <Type>{instance.flavour.name}</Type>
            <br />
            CPUs: <b>{instance.flavour.cpu}</b>
            {instance.flavour.gpu !== '0' && (
              <>
                <br />
                GPUs: <b>{instance.flavour.gpu}</b>
              </>
            )}
          </div>
          {datasets.length !== 0 && (
            <>
              <b>Datasets:</b>
              <NoUl>
                {datasets.map((dataset) => (
                  <li key={dataset.pid}>
                    <i>{dataset.title}</i>
                  </li>
                ))}
              </NoUl>
            </>
          )}
        </div>
      )}
    </>
  )
}

const Instances = (props) => (
  <>
    {props.instances.length > 0 && (
      <BoxCategory>
        <h2>My Environments</h2>
      </BoxCategory>
    )}
    <NoUl>
      {props.instances.map((e) => (
        <Droppable key={e._id} droppableId={e._id}>
          {(provided) => (
            <LiInstance ref={provided.innerRef} {...provided.droppableProps}>
              <Instance
                instance={e}
                provided={provided}
                dropDataset={
                  props.dropDataset &&
                  e._id === props.dropDataset.instance &&
                  props.dropDataset
                }
              />
            </LiInstance>
          )}
        </Droppable>
      ))}
    </NoUl>
    <AddInstance setAddNewInstance={props.setAddNewInstance} />
  </>
)

export default Instances

const LiInstance = styled.li`
  background-color: var(--color-bg-1);
  margin-bottom: var(--dist-smaller);
  font-size: 0.9rem;
  padding: var(--dist);
`
const BoxCategory = styled.div`
  h2 {
    font-size: 1rem;
  }
  background-color: var(--color-bg-1);
  margin-bottom: var(--dist-smaller);
  margin-top: var(--dist);
  padding: var(--dist-small) var(--dist);
`
const Type = styled.span`
  text-transform: capitalize;
  font-weight: 700;
`

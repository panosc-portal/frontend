import React from 'react'
import moment from 'moment'
import {NoUl, Li as Lii, H3} from './Commons'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

//these are very awkward lines of garbage, please dont look ;-)
const Dataset = ({analysis, dataset, index}) => {
  const analysisDataset = {...dataset}
  return (
    <>
      <Draggable draggableId={dataset.pid} index={index}>
        {(provided) => (
          <Li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {analysis ? (
              <div>
                <HA>{analysisDataset.title}</HA>
                Type: <Type>Jupyter</Type>
                <br />
                Last modified:
                <br />
                {moment(analysisDataset.creationDate).format('lll')}
              </div>
            ) : (
              <>
                <H3>{dataset.title}</H3>
                <div>Created {moment(dataset.creationDate).format('L')}</div>
                <div>{dataset.isPublic ? 'Public' : 'Classified'}</div>
                <div>{dataset.size} MB</div>
                <div>
                  Instrument: {dataset.instrument.name} @{' '}
                  {dataset.instrument.facility}
                </div>
              </>
            )}
          </Li>
        )}
      </Draggable>
    </>
  )
}

const Datasets = ({datasets, analysis}) => (
  <Droppable
    isDropDisabled={true}
    droppableId={analysis ? 'analysis' : 'datasets'}
  >
    {(provided) => (
      <>
        <NoUl ref={provided.innerRef} {...provided.droppableProps}>
          {datasets.map((dataset, index) => (
            <Dataset
              dataset={dataset}
              analysis={analysis}
              index={index}
              key={dataset.pid}
            />
          ))}
        </NoUl>
        <div style={{display: 'none'}}>{provided.placeholder}</div>
      </>
    )}
  </Droppable>
)

export default Datasets
const HA = styled.h2`
  font-size: 0.9rem;
`
const Li = styled(Lii)`
  margin-bottom: var(--dist-smaller);
`
const Type = styled.span`
  color: var(--color-jupyter);
  font-weight: 700;
`

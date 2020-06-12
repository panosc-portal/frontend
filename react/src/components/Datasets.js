import React from 'react'
import moment from 'moment'
import {NoUl, Li as Lii, H3} from './Commons'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
const Dataset = ({analysis, dataset, index}) => {
  const analysisDataset = {...dataset}
  analysis && (analysisDataset.pid = dataset.pid + 'fakeAnalysis')
  return (
    <>
      {analysis && (
        <BoxCategory>
          <h2>Original Analysis</h2>
        </BoxCategory>
      )}
      <Draggable
        draggableId={analysis ? analysisDataset.pid : dataset.pid}
        index={index + 99}
      >
        {(provided) => (
          <Li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {analysis ? (
              <>
                <HA>{analysisDataset.title}</HA>
                Type: <Type>Jupyter</Type>
                <br />
                Last modified:
                <br />
                {moment(analysisDataset.creationDate).format('lll')}
              </>
            ) : (
              <>
                <H3>{dataset.title}</H3>
                <div>Created {moment(dataset.creationDate).format('L')}</div>
                <div>{dataset.isPublic ? 'Public' : 'Classified'}</div>
                <div>{dataset.size} MB</div>
                <div>
                  Instrument: {dataset.instrument.name} @{' '}
                  {dataset.instrument.facility}
                </div>{' '}
              </>
            )}
          </Li>
        )}
      </Draggable>
    </>
  )
}

const Datasets = ({datasets, analysis}) => (
  <Droppable droppableId="datasets">
    {(provided) => (
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
    )}
  </Droppable>
)

export default Datasets
const BoxCategory = styled.div`
  h2 {
    font-size: 1rem;
  }
  background-color: var(--color-bg-1);
  margin-bottom: var(--dist-smaller);
  margin-top: var(--dist);
  padding: var(--dist-small) var(--dist);
`
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

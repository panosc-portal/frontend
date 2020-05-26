import React from 'react'
import moment from 'moment'
import {NoUl, Li, H3} from './Commons'
import {Draggable, Droppable} from 'react-beautiful-dnd'

const Dataset = ({dataset, index}) => (
  <Draggable draggableId={dataset._id} index={index}>
    {(provided) => (
      <Li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <H3>{dataset.title}</H3>
        <div>Created {moment(dataset.creationDate).format('L')}</div>
        <div>{dataset.isPublic ? 'Public' : 'Classified'}</div>
        <div>{dataset.size} MB</div>
        <div>
          Instrument: {dataset.instrument.name} @ {dataset.instrument.facility}
        </div>
      </Li>
    )}
  </Draggable>
)

const Datasets = ({datasets}) => (
  <Droppable droppableId="datasets">
    {(provided) => (
      <NoUl ref={provided.innerRef} {...provided.droppableProps}>
        {datasets.map((dataset, index) => (
          <Dataset dataset={dataset} index={index} key={dataset._id} />
        ))}
        {provided.placeholder}
      </NoUl>
    )}
  </Droppable>
)

export default Datasets

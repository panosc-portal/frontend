import React from 'react'
import styled from 'styled-components'
import {Draggable, Droppable} from 'react-beautiful-dnd'

const Analysis = ({item}) => {
  return (
    <Droppable droppableId="analysis">
      {(provided) => (
        <>
          <AnalysisSection ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId={'analysis' + item.pid}>
              {(provided) => (
                <AnalysisItem
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  item={item}
                >
                  {item.title}
                </AnalysisItem>
              )}
            </Draggable>
          </AnalysisSection>
          {provided.placeholder}
        </>
      )}
    </Droppable>
  )
}

export default Analysis

const AnalysisSection = styled.section

const AnalysisItem = styled.div

// app/components/DroppableWrapper.jsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

/**
 * A wrapper for react-beautiful-dnd's Droppable component that handles default props
 * This fixes the React warnings about defaultProps being deprecated
 */
export default function DroppableWrapper({ 
  droppableId, 
  type = "DEFAULT", 
  mode = "standard", 
  direction = "vertical", 
  ignoreContainerClipping = false, 
  isDropDisabled = false, 
  isCombineEnabled = false, 
  renderClone = null,
  children,
  ...props 
}) {
  return (
    <Droppable
      droppableId={droppableId}
      type={type}
      mode={mode}
      direction={direction}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={renderClone}
      {...props}
    >
      {children}
    </Droppable>
  );
}
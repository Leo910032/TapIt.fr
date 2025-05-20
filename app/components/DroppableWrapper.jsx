// Create a wrapper for Droppable to fix defaultProps warning
// app/components/DroppableWrapper.jsx

import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// This wrapper component uses default parameters instead of defaultProps
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

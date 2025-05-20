// app/dashboard/(dashboard pages)/settings/components/mini components/SocialCard.jsx - Fixed version
"use client"
import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SocialElement from '../../elements/SocialElement';
import { SocialContext } from '../SocialSetting';
import DroppableWrapper from '../../../../../components/DroppableWrapper'; // Import the wrapper

const DraggableList = () => {
    const { socialsArray, setSocialsArray } = useContext(SocialContext);

    const handleDragEnd = (result) => {
        if (!result.destination) return; // Item was dropped outside the list

        const updatedItems = Array.from(socialsArray);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);

        setSocialsArray(updatedItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Replace Droppable with DroppableWrapper */}
            <DroppableWrapper droppableId="droppable">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className='pl-4 grid gap-1'>
                        {socialsArray.map((item, index) => (
                            <SocialElement index={index} item={item} key={item.id} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </DroppableWrapper>
        </DragDropContext>
    );
};

export default DraggableList;
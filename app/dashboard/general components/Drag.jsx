// app/dashboard/general components/Drag.jsx - Fixed version
"use client"
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Normal from '../general elements/draggables/Normal';
import Special from '../general elements/draggables/Special';
import { ManageLinksContent } from './ManageLinks';
import DroppableWrapper from '../../components/DroppableWrapper'; // Import the wrapper

const DraggableList = ({ array }) => {
    const { setData }= useContext(ManageLinksContent);
    const [items, setItems] = useState([]);

    useEffect(()=>{
        setItems([...array]); 
    }, [array]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setData(newItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Replace Droppable with DroppableWrapper */}
            <DroppableWrapper droppableId="draggable-list" mode="virtual">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col gap-8'>
                        {items.map((item, index) => {
                            if (item.type === 0) {
                                return <Normal item={item} index={index} key={index+Math.random()} />
                            }else{
                                return <Special item={item} index={index} key={index+Math.random()} />
                            }
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </DroppableWrapper>
        </DragDropContext>
    );
};

export default DraggableList;
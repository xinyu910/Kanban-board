import React from 'react'
import {Draggable} from 'react-beautiful-dnd';
import Delete from './Delete';

interface CardProps {
  description: string;
  index: number;
  id: string;
  onDelete: (id: string) => void;
}

//calling the onDelete method passed from CardContainer
const Card = ({description, index, id, onDelete}: CardProps) => {
  const handleClick = () => {
    onDelete(id);
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <div className='task'
        ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{description}</p>
          <button className='deleteIcon' onClick={handleClick} ><Delete /></button>
        </div>
      )}
    </Draggable>
  )
}

export default Card

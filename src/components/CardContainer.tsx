import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'
import "./Cards.css"
import {StrictModeDroppable} from "./Droppable";

interface containerProps{
  col: {
    title: string
    list: any[]
  }
  handleRemove: (id: string, title: string) => void;
}

const CardContainer = ({col: { list, title }, handleRemove }: containerProps) => {
  const handleDelete = (id: string) => {
    handleRemove(id, title);
  };

  const getBackgroundColor = (title: string) =>{
    switch (title) {
      case "Todo":
        return "#E1E4E8";
      case "In Progress":
        return "#F0E7F6";
      case "Blocked":
        return "#FFDCE0";
      case "Done":
        return "#CBDFD8";
   }
  }
  return (
    <StrictModeDroppable droppableId={title}>
      {provided => (
        <div className = 'column'
        {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className='label' style={{backgroundColor: `${getBackgroundColor(title)}`}}><span>{title}</span></div>
          {list.map((item, index) => (
            <Card key={item.id} description={item.text} index={index} id={item.id} onDelete={handleDelete} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  )
}

export default CardContainer

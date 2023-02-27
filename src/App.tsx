import React, { useState } from 'react'
import "./App.css";
import AddButton from './components/AddButton';
import AddForm from './components/AddForm';
import CardContainer from './components/CardContainer';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';

interface column {
  [key: string]: any
}

const App: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const initialColumns: column = {
    "Todo": {
      title: 'Todo',
      list: [{id: uuidv4(), text: "Implement Android app"}]
    },
    "In Progress": {
      title: 'In Progress',
      list: [{id: uuidv4(), text: "UI/UX design"}]
    },
    "Blocked": {
      title: 'Blocked',
      list: [{id: uuidv4(), text: "Front End development"}]
    },
    "Done": {
      title: 'Done',
      list: []
    }
  }
  const [columns, setColumns] = useState(initialColumns)

  const handleAdd = (category: string, description: string) => {
    console.log(columns[category]);
    const newList = columns[category]['list'];
      newList.push({id: uuidv4(), text: description});
      const newColumn = {
        title: category,
        list: newList
      }
      setColumns({...columns, [category]: newColumn});
  }

  const handleButtonClick = () => {
    setIsFormVisible(true);
  }

  const handleFormSubmit = (category: string, description: string) => {
    setIsFormVisible(false);
    handleAdd(category, description)
  }

  const handleFormClose = () => {
    setIsFormVisible(false);
  }

  const handleRemove = (id: string, category: string) => {
    const newList = columns[category]['list'].filter(
      (object: any, idx: number) => object.id !== id);
    console.log(newList);
    const newColumn = {
      title: category,
      list: newList
    }
    setColumns({...columns, [category]: newColumn});
  }
  
  //drag and drop partially follow this tutorial:
  //https://dev.to/imjoshellis/codealong-multi-column-drag-and-drop-in-react-3781
  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (destination === undefined || destination === null) return null

    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) return null

    // Set start droppable and end droppable column values
    const start: any = columns[source.droppableId];
    const end: any = columns[destination.droppableId];
    
    // same column case
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (obj: any, idx: number) => obj.id !== draggableId
      )

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        title: start.title,
        list: newList
      }

      // Update the state
      setColumns({...columns, [newCol.title]: newCol })
      return null
    } else {
      // If start is different from end, need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (obj: any, idx: number) => obj.id !== draggableId
      )

      // Create a new start column
      const newStartCol = {
        title: start.title,
        list: newStartList
      }

      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
      const newEndCol = {
        title: end.title,
        list: newEndList
      }

      // Update the state
      setColumns({...columns, [newStartCol.title]: newStartCol, [newEndCol.title]: newEndCol});
      return null
    }
  }

  return (
    <div className='App'>
      {isFormVisible && (
          <AddForm onSubmit={handleFormSubmit}
                   onClose={handleFormClose}/>
      )}
      <div className={`"content" ${isFormVisible ? "gray-out" : ""}`}>
        <div className='heading'>
          <h1>Kanban Board</h1>
          <p className='description'>For Agile Development</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
        <div className='cardContainerGroup'>
        {Object.values(columns).map((col, id) => (
          <CardContainer col={col} handleRemove={handleRemove} key={id} />
        ))}
        </div>
        </DragDropContext>
        <AddButton onClick={handleButtonClick}/>
        </div>
    </div>
  )
}

export default App

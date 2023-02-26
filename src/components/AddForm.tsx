import React, { useState } from 'react'
import "./ButtonForm.css"

interface TaskFormProps {
    onSubmit: (category: string, description: string) => void;
    onClose: () => void;
}

const AddForm = ({onSubmit, onClose}: TaskFormProps) => {
    const [category, setCategory] = useState<string>('todo');
    const [description, setDescription] = useState<string>('');

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(category, description);
        setCategory('todo');
        setDescription('');
    }
  

  return (
    <div className="TaskForm-overlay">
      <div className="TaskForm">
        <button className="close-button" onClick={onClose}>
            &times;
        </button>
        <form onSubmit={handleSubmit} className='form'>
          <h2>Add a Task</h2>
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange} required>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="done">Done</option>
          </select>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} placeholder="Enter task description here" 
          onChange={handleDescriptionChange} required/>
          <button type="submit" className='submit'>Add task</button>
        </form>
      </div>
    </div>
  )
}

export default AddForm

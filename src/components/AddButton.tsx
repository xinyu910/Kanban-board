import React from 'react'
import "./ButtonForm.css";

interface buttonProps{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const AddButton = (props: buttonProps) => {
  return (
    <div>
      <button className="add-button" onClick={props.onClick}></button>
    </div>
  )
}

export default AddButton

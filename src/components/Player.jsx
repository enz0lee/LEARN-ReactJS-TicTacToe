import React, { useState } from 'react'

function Player({ name: initialName, symbol, isActive, onNameChange }) {
  const [name, setName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(initialName)
  const editButtonLabel = 'Edit'
  const aaa = 'fasfas'

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleSaveClick() {
    setName(editedName)
    setIsEditing(false)
    onNameChange(symbol, editedName)
  }

  function handleNameChange(event) {
    setEditedName(event.target.value)
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={editedName} onChange={handleNameChange} />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>{editButtonLabel}</button>
      )}
    </li>
  )
}

export default Player

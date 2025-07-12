import React, { useState } from 'react'

function Player({ name: initialName, symbol }) {
  const [name, setName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(initialName)
  const editButtonLabel = 'Edit'

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleSaveClick() {
    setName(editedName)
    setIsEditing(false)
  }

  function handleNameChange(event) {
    setEditedName(event.target.value)
  }

  return (
    <li>
      <span className="player">
        <span className="player-name">
          {isEditing ? (
            <input type="text" value={editedName} onChange={handleNameChange} />
          ) : (
            name
          )}
        </span>
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

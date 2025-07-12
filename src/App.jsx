import React, { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import GameOver from './components/GameOver'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(turns) {
  if (turns.length === 0) return 'X'
  return turns[0].player === 'X' ? 'O' : 'X'
}

function checkWinner(board) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return board[row][0]
    }
  }
  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return board[0][col]
    }
  }
  // Check diagonals
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]
  }
  return null
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  let activePlayer = deriveActivePlayer(gameTurns)

  // Create a copy of the initial game board
  const gameBoard = initialGameBoard.map((row) => [...row])
  for (const turn of gameTurns) {
    const { square, player } = turn
    gameBoard[square.row][square.col] = player
  }

  const winner = checkWinner(gameBoard)
  const isDraw = gameTurns.length === 9 && !winner

  function handleTileClick(rowIndex, colIndex) {
    console.log(`Tile clicked at row ${rowIndex}, column ${colIndex}`)
    // setActivePlayer((prev) => (prev === 'X' ? 'O' : 'X'))
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onTileClick={handleTileClick} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App

import React, { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import GameOver from './components/GameOver'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(turns) {
  if (turns.length === 0) return 'X'
  return turns[0].player === 'X' ? 'O' : 'X'
}

function checkWinner(board, players) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return players[board[row][0]]
    }
  }
  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return players[board[0][col]]
    }
  }
  // Check diagonals
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return players[board[0][0]]
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return players[board[0][2]]
  }
  return null
}

function deriveGameBoard(turns) {
  const gameBoard = INITIAL_GAME_BOARD.map((row) => [...row])
  for (const turn of turns) {
    const { square, player } = turn
    gameBoard[square.row][square.col] = player
  }
  return gameBoard
}
function App() {
  const [players, setPlayers] = useState(PLAYERS)
  // const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])
  let activePlayer = deriveActivePlayer(gameTurns)

  // Create a copy of the initial game board
  const gameBoard = deriveGameBoard(gameTurns)

  const winner = checkWinner(gameBoard, players)
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

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [playerSymbol]: newName,
    }))
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onNameChange={handlePlayerNameChange}
          />
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

export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {`Player ${turn.player} placed at row ${turn.square.row}, column ${turn.square.col}`}
        </li>
      ))}
    </ol>
  )
}

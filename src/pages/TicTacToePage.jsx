import { useState } from "react";
import Board from "../components/Board";
import StatusBar from "../components/StatusBar";

const WINNING_OPTIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateGameStatus(board, isXNext) {
  let winner = null;


  for (const [a, b, c] of WINNING_OPTIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }

  const isBoardFull = board.every((cell) => cell !== null);
  const isDrawStatus = isBoardFull && !winner;

  const turn = isXNext ? "X" : "O";

  return {
    winner,
    isDrawStatus,
    turn,
  };
}

export default function TicTacToePage() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState(["Game start"]);
  const { winner, isDrawStatus, turn } = calculateGameStatus(board, isXNext);

  function handleSquareClick(index) {
 
    if (winner || isDrawStatus) return;
    if (board[index]) return;

    const nextBoard = board.slice();
    nextBoard[index] = turn;

    setBoard(nextBoard);
    setIsXNext(!isXNext);
    setHistory((prev) => [
      ...prev,
      `Move #${prev.length}: Player ${turn}`,
    ]);
  }


  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHistory(["Game start"]);
  }


  let statusText = `Turn: ${turn}`;
  if (winner) {
    statusText = `wins: ${winner}`;
  } else if (isDrawStatus) {
    statusText = "Draw!";
  }

  return (
    <div className="page">
      <div className="layout">
        
        {/* left side - game */}
        <div className="card gameCard">
          <h1 className="title">Tic Tac Toe</h1>
  
          <StatusBar text={statusText} />
          <Board board={board} onSquareClick={handleSquareClick} />
  
          <button className="restartBtn" onClick={handleRestart}>
            Restart
          </button>
        </div>
  
        {/* right side - move history */}
        <div className="card historyCard">
          <h1 className="title titleSmall">Move History</h1>
  
          <div className="historyList">
            {history.map((item, index) => (
              <div key={index} className="historyItem">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import Board from "../components/Board";
import StatusBar from "../components/StatusBar";

function WinningOptions(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function TicTacToePage() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState(["Game start"]);

  const winner = WinningOptions(board);
  const turn = isXNext ? "X" : "O";

  function handleSquareClick(i) {
    if (winner) return;
    if (board[i]) return;

    const next = board.slice();
    next[i] = turn;
    setBoard(next);
    setIsXNext(!isXNext);
    setHistory((prev) => [...prev,
      `Move #${prev.length}: Player ${turn}`,
    ]);
  }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHistory(["Game start"]);
  }



  function getStatusText(winner, turn) {
    if (winner) {
      return `wins: ${winner}`;
    }
    return `Turn: ${turn}`;
  }
  
  const statusText = getStatusText(winner, turn);

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
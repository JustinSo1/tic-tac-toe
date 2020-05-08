import React, { useState } from "react";
import Board from "./Board";
import { DIMS_LENGTH, DIMS_WIDTH } from "../constants";

const grid = Array(DIMS_LENGTH)
  .fill(null)
  .map(() => new Array(DIMS_WIDTH).fill(null));
const Game = () => {
  const [history, setHistory] = useState([
    Array(DIMS_LENGTH)
      .fill(null)
      .map(() => new Array(DIMS_WIDTH).fill(null)),
  ]);
  const [players, setPlayers] = useState({ human: null, computer: null });
  const [stepNumber, setStepNumber] = useState(0);
  const handleClick = (row, col) => {
    const pastHistory = history.slice(0, stepNumber + 1);
    const currentSquares = pastHistory[stepNumber];
    const squares = currentSquares.map((arr) => arr.slice());
    // Change X to something different (integer)
    squares[row][col] = "X";
    // console.log(squares);
    // console.log("past", pastHistory);
    setHistory([...pastHistory, squares]);
    setStepNumber(pastHistory.length);
  };
  const jumpTo = (step) => {
    setStepNumber(step);
    // setXisNext(step % 2 === 0);
  };
  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Got to move #${move}` : "Go to start";
      return (
        // Change key
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div>{renderMoves()}</div>
    </>
  );
};
export default Game;
// const SQUARE_DIMS = 100;
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   width: ${({ dims }) => `${dims * (SQUARE_DIMS + 5)}px`};
//   flex-flow: wrap;
//   position: relative;
// `;

// const SQUARE = 0;
// const Box = styled.div`
//   ${palette}
//   ${spacing}
//   ${borders}
//   ${display}
//   ${flexbox}
// //   background-color: indianred;
// //   border: 0.5rem solid black;
// `;
// Can trry inheritance

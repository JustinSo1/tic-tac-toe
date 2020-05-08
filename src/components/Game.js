import React, { useState, useCallback, useEffect } from "react";
import Board from "./Board";
import {
  DIMS_LENGTH,
  DIMS_WIDTH,
  GAME_STATES,
  PLAYER_X,
  PLAYER_O,
} from "../constants";
import { switchPlayer } from "../helpers";
// const grid = Array(DIMS_LENGTH)
//   .fill(null)
//   .map(() => new Array(DIMS_WIDTH).fill(null));
const Game = () => {
  const [grid, setGrid] = useState([
    Array(DIMS_LENGTH)
      .fill(null)
      .map(() => new Array(DIMS_WIDTH).fill(null)),
  ]);
  const [players, setPlayers] = useState({ human: null, computer: null });
  const [stepNumber, setStepNumber] = useState(0);
  const [nextMove, setNextMove] = useState(null);
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);

  const choosePlayer = (option) => {
    setPlayers({ human: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X); // Set the Player X to make the first move
  };
  const playerMove = (row, col) => {
    if (!grid[stepNumber][row][col] && nextMove === players.human) {
      const pastHistory = grid.slice(0, stepNumber + 1);
      const currentSquares = pastHistory[stepNumber];
      const squares = currentSquares.map((arr) => arr.slice());
      // Change X to something different (integer)
      squares[row][col] = players.human;
      // console.log(squares);
      // console.log("past", pastHistory);
      // move(row, col, players.human, squares);
      setGrid([...pastHistory, squares]);
      setNextMove(players.computer);
      setStepNumber(pastHistory.length);
    }
  };
  // const computerMove = useCallback(() => {

  // })
  // const move = useCallback(
  //   (row, col, player, squares) => {
  //     if (player && gameState === GAME_STATES.inProgress) {
  //       // const pastHistory = grid.slice(0, stepNumber + 1);
  //       // const currentSquares = pastHistory[stepNumber];
  //       // const squares = currentSquares.map((arr) => arr.slice());
  //       squares[row][col] = player;
  //       // setStepNumber(pastHistory.length);
  //     }
  //   },
  //   [gameState]
  // );
  const jumpTo = (step) => {
    setStepNumber(step);
    // setXisNext(step % 2 === 0);
  };
  const renderMoves = () =>
    grid.map((_step, move) => {
      const destination = move ? `Got to move #${move}` : "Go to start";
      return (
        // Change key
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return gameState === GAME_STATES.notStarted ? (
    <div>
      <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
      <p>or</p>
      <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
    </div>
  ) : (
    <>
      <Board squares={grid[stepNumber]} onClick={playerMove} />
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

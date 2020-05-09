import React, { useState, useCallback, useEffect } from "react";
import Board from "./Board";
import {
  DIMS_LENGTH,
  DIMS_WIDTH,
  GAME_STATES,
  PLAYER_X,
  PLAYER_O,
} from "../constants";
import { switchPlayer, getRandomInt } from "../helpers";
// Implement better buttons
const arr = Array(DIMS_LENGTH)
  .fill(null)
  .map(() => new Array(DIMS_WIDTH).fill(null));
const Game = () => {
  const [grid, setGrid] = useState([arr]);
  const [players, setPlayers] = useState({ human: null, computer: null });
  const [stepNumber, setStepNumber] = useState(0);
  const [nextMove, setNextMove] = useState(null);
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);

  const choosePlayer = (option) => {
    setPlayers({ human: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };
  const move = useCallback(
    (row, col, player) => {
      if (player && gameState === GAME_STATES.inProgress) {
        const pastHistory = grid.slice(0, stepNumber + 1);
        const currentSquares = pastHistory[stepNumber];
        const squares = currentSquares.map((arr) => arr.slice());
        squares[row][col] = player;
        setGrid([...pastHistory, squares]);

        setStepNumber(pastHistory.length);
      }
    },
    [gameState, stepNumber, grid]
  );
  const playerMove = (row, col) => {
    if (!grid[stepNumber][row][col] && nextMove === players.human) {
      move(row, col, players.human);
      setNextMove(players.computer);
    }
  };

  const computerMove = useCallback(() => {
    let row = getRandomInt(0, 4);
    let col = getRandomInt(0, 4);
    while (grid[stepNumber][row][col]) {
      row = getRandomInt(0, 4);
      col = getRandomInt(0, 4);
    }
    move(row, col, players.computer);
    setNextMove(players.human);
  }, [move, grid, players, stepNumber]);

  const jumpTo = (step) => {
    setStepNumber(step);
  };
  const renderMoves = () =>
    grid.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer &&
      gameState !== GAME_STATES.over
    ) {
      // Delay computer moves to make them more natural
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);

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

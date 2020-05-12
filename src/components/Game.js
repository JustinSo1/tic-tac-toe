import React, { useState, useCallback, useEffect } from "react";
import Board from "./Board";
import {
  GAME_STATES,
  PLAYER_X,
  PLAYER_O,
  DRAW,
  DIMS_LENGTH,
  DIMS_WIDTH,
} from "../constants";
import { switchPlayer, getRandomInt, calculateWinner } from "../helpers";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const arr = Array(DIMS_LENGTH)
  .fill(null)
  .map(() => new Array(DIMS_WIDTH).fill(null));

const Game = () => {
  const [grid, setGrid] = useState([arr]);
  const [players, setPlayers] = useState({ human: null, computer: null });
  const [stepNumber, setStepNumber] = useState(0);
  const [nextMove, setNextMove] = useState(null);
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid([arr]);
    setStepNumber(0);
  };

  const playerMove = (row, col) => {
    if (!grid[stepNumber][row][col] && nextMove === players.human) {
      move(row, col, players.human);
      setNextMove(players.computer);
    }
  };

  const computerMove = useCallback(() => {
    let row = getRandomInt(0, DIMS_LENGTH - 1);
    let col = getRandomInt(0, DIMS_WIDTH - 1);
    while (grid[stepNumber][row][col]) {
      row = getRandomInt(0, DIMS_LENGTH - 1);
      col = getRandomInt(0, DIMS_WIDTH - 1);
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
          <Button {...buttonStyle} onClick={() => jumpTo(move)}>
            {destination}
          </Button>
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
      // Delay the computer's movement to prevent instantaneous movement
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);

  useEffect(() => {
    const winner = calculateWinner(grid[stepNumber]);
    // console.log(winner);
    const declareWinner = (winner) => {
      let winnerStr;
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It's a draw";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
    };

    if (winner !== null && gameState !== GAME_STATES.over) {
      declareWinner(winner);
    }
  }, [gameState, grid, nextMove, stepNumber]);

  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <div>
          <Button {...buttonStyle} onClick={() => choosePlayer(PLAYER_X)}>
            X
          </Button>
          <p>or</p>
          <Button {...buttonStyle} onClick={() => choosePlayer(PLAYER_O)}>
            O
          </Button>
        </div>
      );
    case GAME_STATES.inProgress:
      return (
        <>
          <Board squares={grid[stepNumber]} onClick={playerMove} />
          <div>{renderMoves()}</div>
        </>
      );
    case GAME_STATES.over:
      return (
        <div>
          <Button {...buttonStyle} onClick={handleOpen}>
            Result
          </Button>
          <Modal
            aria-labelledby="title"
            aria-describedby="description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="title">{winner}</h2>
                <p id="description">Congratulations on finishing the game!</p>
              </div>
            </Fade>
          </Modal>
          <Button {...buttonStyle} onClick={startNewGame}>
            Start over
          </Button>
        </div>
      );
  }
};
export default Game;

const buttonStyle = {
  variant: "contained",
  color: "primary",
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

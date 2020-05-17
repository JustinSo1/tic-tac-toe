import React, { useState, useCallback, useEffect } from "react";
import Board from "./Board";
import {
  GAME_STATES,
  PLAYER_X,
  PLAYER_O,
  DRAW,
  DIMS_LENGTH,
  DIMS_WIDTH,
  GAME_MODES,
  marks,
  minSize,
  maxSize,
} from "../constants";
import {
  switchPlayer,
  getRandomInt,
  calculateWinner,
  cloneGrid,
  isEmpty,
  getEmptySquares,
} from "../helpers";
import { Button, Box, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { minimax } from "../minimax";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const arr = Array(DIMS_LENGTH)
  .fill(null)
  .map(() => new Array(DIMS_WIDTH).fill(null));

const Game = () => {
  const [players, setPlayers] = useState({ human: null, computer: null });
  const [stepNumber, setStepNumber] = useState(0);
  const [nextMove, setNextMove] = useState(null);
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(GAME_MODES.medium);
  const [length, setLength] = useState(DIMS_LENGTH);
  const [width, setWidth] = useState(DIMS_WIDTH);
  const [grid, setGrid] = useState([
    Array(length)
      .fill(null)
      .map(() => new Array(width).fill(null)),
  ]);
  // Getting delayed responses
  console.log("grid row", grid[stepNumber].length);
  console.log("grid col", grid[stepNumber][0].length);

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
  const setLengthOfBoard = (event, value) => {
    console.log(value);
    setLength(value);
    setGrid([
      Array(length)
        .fill(null)
        .map(() => new Array(width).fill(null)),
    ]);
  };
  const setWidthOfBoard = (event, value) => {
    console.log(value);
    setWidth(value);
    setGrid([
      Array(length)
        .fill(null)
        .map(() => new Array(width).fill(null)),
    ]);
  };

  /**
   * Does a deep copy of the current grid and inserts the
   * index of the grid with the proper player char
   * @param {integer} row - Row index of the 2D array
   * @param {integer} col - Column index of the 2D array
   * @param {integer} player - the player character
   *
   *
   *
   *
   */
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
    const getIndexToMove = () => {
      let row = getRandomInt(0, grid[stepNumber].length - 1);
      let col = getRandomInt(0, grid[stepNumber][0].length - 1);
      while (grid[stepNumber][row][col]) {
        row = getRandomInt(0, grid[stepNumber].length - 1);
        col = getRandomInt(0, grid[stepNumber][0].length - 1);
      }
      return [row, col];
    };
    const gridCopy = cloneGrid(grid[stepNumber]);
    const empty = isEmpty(grid[stepNumber]);
    let row = 0;
    let col = 0;
    let index = null;
    switch (mode) {
      case GAME_MODES.easy:
        [row, col] = getIndexToMove();
        break;
      case GAME_MODES.medium:
        const smartMove = !isEmpty(grid[stepNumber]) && Math.random() < 0.5;
        if (smartMove) {
          if (grid[stepNumber].length <= 3 && grid[stepNumber][0].length <= 3) {
            index = minimax(gridCopy, players.computer)[1];
          } else {
            [row, col] = getIndexToMove();
          }
        } else {
          [row, col] = getIndexToMove();
        }
        break;
      case GAME_MODES.difficult:
      default:
        if (grid[stepNumber].length <= 3 && grid[stepNumber][0].length <= 3) {
          index = empty
            ? [
                getRandomInt(0, grid[stepNumber].length - 1),
                getRandomInt(0, grid[stepNumber][0].length - 1),
              ]
            : minimax(gridCopy, players.computer)[1];
        } else {
          if (getEmptySquares(grid[stepNumber]).length <= 5) {
            index = minimax(gridCopy, players.computer)[1];
          } else {
            index = getIndexToMove();
          }
        }
    }
    if (index) {
      [row, col] = index;
    }
    if (!grid[stepNumber][row][col]) {
      move(row, col, players.computer);
      setNextMove(players.human);
    }
  }, [move, grid, players, stepNumber, mode]);

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
  const changeMode = (e) => {
    setMode(e.target.value);
  };

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

  function valuetext(value) {
    // console.log(value);
    return `${value}`;
  }

  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <Box display="flex" justifyContent="center" m={5} p={5}>
          <div>
            <Typography gutterBottom="true">Choose your player</Typography>
            <Button {...buttonStyle} onClick={() => choosePlayer(PLAYER_X)}>
              X
            </Button>
            <Box p={1} m={1}>
              <Typography gutterBottom="true">Or</Typography>
            </Box>
            <Button {...buttonStyle} onClick={() => choosePlayer(PLAYER_O)}>
              O
            </Button>
            <hr />
            <div>
              <Typography gutterBottom="true">Choose difficulty</Typography>
              <Select onChange={changeMode} value={mode}>
                {Object.keys(GAME_MODES).map((key) => {
                  const gameMode = GAME_MODES[key];
                  return (
                    <option key={gameMode} value={gameMode}>
                      {key}
                    </option>
                  );
                })}
              </Select>
              <hr />
            </div>
            <Typography id="discrete-slider-custom" gutterBottom>
              Length of Game Board In Squares
            </Typography>
            <Slider
              defaultValue={3}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={minSize}
              max={maxSize}
              onChangeCommitted={(event, value) =>
                setLengthOfBoard(event, value)
              }
            />
            <Typography id="discrete-slider-custom" gutterBottom>
              Width of Game Board In Squares
            </Typography>
            <Slider
              defaultValue={3}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={minSize}
              max={maxSize}
              onChangeCommitted={(event, value) =>
                setWidthOfBoard(event, value)
              }
            />
          </div>
        </Box>
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

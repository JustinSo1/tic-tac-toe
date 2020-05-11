import { PLAYER_O, PLAYER_X } from "./constants";
export function calculateWinner(squares) {
  squares = [
    [1, 6, 8, 3, 10],
    [1, 5, 6, 5, 10],
    [2, 2, 5, 2, 2],
  ];
  let amtRequiredToWin = squares[0].length;

  let horizontalCheck;
  let verticalCheck;
  // Horizontal check
  for (let row = 0; row < squares.length; ++row) {
    horizontalCheck = amtRequiredToWin;
    for (let col = 0; col < squares[0].length; ++col) {
      if (squares[row][0] === squares[row][col]) {
        --horizontalCheck;
      }
    }
    if (horizontalCheck === 0) {
      return squares[row][0];
      // console.log(squares[row][0]);
    }
  }

  amtRequiredToWin = squares.length;
  // Vertical Check
  for (let col = 0; col < squares[0].length; ++col) {
    verticalCheck = amtRequiredToWin;
    for (let row = 0; row < squares.length; ++row) {
      if (squares[0][col] === squares[row][col]) {
        --verticalCheck;
      }
    }
    if (verticalCheck === 0) {
      return squares[0][col];
      // console.log(squares[0][col]);
    }
  }

  // squares = [
  //   [5, 6, 7, 8, 9],
  //   [4, 5, 6, 7, 8],
  //   [3, 4, 5, 6, 7],
  //   [2, 3, 4, 5, 6],
  //   [1, 2, 3, 4, 5],
  // ];

  // Diagonal Check
  // # of rows
  let rows = squares.length;
  // # of cols
  let cols = squares[0].length;

  let diagonalCheck = Math.min(rows, cols);

  let out = [];
  for (let i = 1 - rows; i < cols; i++) {
    let group = [];
    for (let j = 0; j < rows; j++) {
      if (i + j >= 0 && i + j < cols) {
        group.push(squares[j][i + j]);
      }
    }
    out.push(group);
  }

  // console.log("out", out);
  for (let i = 0; i < out.length; ++i) {
    if (out[i].length === diagonalCheck) {
      if (out[i].every((element, index, arr) => element === arr[0])) {
        return out[i][0];
        // console.log(out[i][0]);
      }
    }
  }

  // squares = [
  //   [1, 2, 3, 4, 5],
  //   [2, 3, 4, 5, 6],
  //   [3, 4, 5, 6, 7],
  //   [4, 5, 6, 7, 8],
  //   [5, 6, 7, 8, 9],
  // ];

  // Reverse Diagonal check
  rows = squares.length;
  cols = squares[0].length;
  out = [];
  for (let slice = 0; slice < rows + cols - 1; ++slice) {
    let z1 = slice < cols ? 0 : slice - cols + 1;
    let z2 = slice < rows ? 0 : slice - rows + 1;
    let group = [];
    for (let j = slice - z2; j >= z1; --j) {
      group.push(squares[j][slice - j]);
    }
    out.push(group);
  }
  // console.log("out1", out);
  for (let i = 0; i < out.length; ++i) {
    if (out[i].length === diagonalCheck) {
      if (out[i].every((element, index, arr) => element === arr[0])) {
        return out[i][0];
        // console.log(out[i][0]);
      }
    }
  }
}
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const switchPlayer = (player) => {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
};

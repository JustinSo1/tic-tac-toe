import { PLAYER_O, PLAYER_X, DRAW } from "./constants";
export function calculateWinner(squares) {
  let horizontalCheck = squares[0].length;
  let verticalCheck = squares.length;

  // Horizontal check
  // let amtRequiredToWin = squares[0].length;
  // console.log(amtRequiredToWin)
  let out = [];
  let group = [];
  for (let row = 0; row < squares.length; ++row) {
    group = [];
    for (let col = 0; col < squares[0].length; ++col) {
      group.push(squares[row][col]);
    }
    out.push(group);
  }

  // console.log("horiz",out);
  for (let i = 0; i < out.length; ++i) {
    if (out[i].length === horizontalCheck) {
      if (out[i].every((element, index, arr) => element && element === arr[0] )) {
        return out[i][0];
      }
    }
  }

  // Vertical Check
  out = [];
  for (let col = 0; col < squares[0].length; ++col) {
    group = [];
    for (let row = 0; row < squares.length; ++row) {
      group.push(squares[row][col]);
    }
    out.push(group);
  }
  // console.log("vert", out);

  for (let i = 0; i < out.length; ++i) {
    if (out[i].length === verticalCheck) {
      if (out[i].every((element, index, arr) => element &&  element === arr[0])) {
        return out[i][0];
      }
    }
  }

  // amtRequiredToWin = squares.length;
  // // Vertical Check
  // for (let col = 0; col < squares[0].length; ++col) {
  //   verticalCheck = amtRequiredToWin;
  //   for (let row = 0; row < squares.length; ++row) {
  //     if (squares[0][col] === squares[row][col]) {
  //       --verticalCheck;
  //     }
  //   }
  //   if (verticalCheck === 0) {
  //     return squares[0][col];
  //     // console.log(squares[0][col]);
  //   }
  // }

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

  out = [];
  for (let i = 1 - rows; i < cols; i++) {
    group = [];
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
      if (out[i].every((element, index, arr) => element && element === arr[0])) {
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
    group = [];
    for (let j = slice - z2; j >= z1; --j) {
      group.push(squares[j][slice - j]);
    }
    out.push(group);
  }
  // console.log("out1", out);
  for (let i = 0; i < out.length; ++i) {
    if (out[i].length === diagonalCheck) {
      if (out[i].every((element, index, arr) => element && element === arr[0])) {
        return out[i][0];
        // console.log(out[i][0]);
      }
    }
  }
  if (getEmptySquares(squares).length === 0) {
    return DRAW;
  }
  return null;
}
export const getEmptySquares = (grid) => {
  let emptySquares = [];
  grid.forEach((row, i) => {
    row.forEach((ele, j) => {
      if (ele === null) {
        emptySquares = [...emptySquares, [i, j]];
      }
    });
  });
  // console.log(emptySquares);
  return emptySquares;
};
export const isEmpty = (grid) => {
  return getEmptySquares(grid).length === 0;
}
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const switchPlayer = (player) => {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
};
export const cloneGrid = (grid) => {
  return grid.map((arr) => arr.slice());
}
export const makeMove = (grid, square, player) => {
  const [row, col] = square
  if (grid[row][col] === null) {
    grid[row][col] = player;
  }
};


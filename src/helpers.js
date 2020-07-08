import { PLAYER_O, PLAYER_X, DRAW } from "./constants";
export function calculateWinner(squares) {
  // let horizontalCheck = squares[0].length;
  // let verticalCheck = squares.length;

  // // Horizontal check
  // let out = [];
  // let group = [];
  // for (let row = 0; row < squares.length; ++row) {
  //   group = [];
  //   for (let col = 0; col < squares[0].length; ++col) {
  //     group.push(squares[row][col]);
  //   }
  //   out.push(group);
  // }

  // for (let i = 0; i < out.length; ++i) {
  //   if (out[i].length === horizontalCheck) {
  //     if (
  //       out[i].every((element, index, arr) => element && element === arr[0])
  //     ) {
  //       return out[i][0];
  //     }
  //   }
  // }

  // // Vertical Check
  // out = [];
  // for (let col = 0; col < squares[0].length; ++col) {
  //   group = [];
  //   for (let row = 0; row < squares.length; ++row) {
  //     group.push(squares[row][col]);
  //   }
  //   out.push(group);
  // }
  // for (let i = 0; i < out.length; ++i) {
  //   if (out[i].length === verticalCheck) {
  //     if (
  //       out[i].every((element, index, arr) => element && element === arr[0])
  //     ) {
  //       return out[i][0];
  //     }
  //   }
  // }

  // // Diagonal Check
  // // # of rows
  // let rows = squares.length;
  // // # of cols
  // let cols = squares[0].length;

  // let diagonalCheck = Math.min(rows, cols);

  // out = [];
  // for (let i = 1 - rows; i < cols; i++) {
  //   group = [];
  //   for (let j = 0; j < rows; j++) {
  //     if (i + j >= 0 && i + j < cols) {
  //       group.push(squares[j][i + j]);
  //     }
  //   }
  //   out.push(group);
  // }
  // for (let i = 0; i < out.length; ++i) {
  //   if (out[i].length === diagonalCheck) {
  //     if (
  //       out[i].every((element, index, arr) => element && element === arr[0])
  //     ) {
  //       return out[i][0];
  //     }
  //   }
  // }

  // // Reverse Diagonal check
  // rows = squares.length;
  // cols = squares[0].length;
  // out = [];
  // for (let slice = 0; slice < rows + cols - 1; ++slice) {
  //   let z1 = slice < cols ? 0 : slice - cols + 1;
  //   let z2 = slice < rows ? 0 : slice - rows + 1;
  //   group = [];
  //   for (let j = slice - z2; j >= z1; --j) {
  //     group.push(squares[j][slice - j]);
  //   }
  //   out.push(group);
  // }
  // for (let i = 0; i < out.length; ++i) {
  //   if (out[i].length === diagonalCheck) {
  //     if (
  //       out[i].every((element, index, arr) => element && element === arr[0])
  //     ) {
  //       return out[i][0];
  //     }
  //   }
  // }
  // let rowScores = Array(squares.length).fill(0);

  // let colScores = Array(squares[0].length).fill(0);
  // let diagonal = 0;
  // let antiDiagonal = 0;
  // for (let row = 0; row < squares.length; ++row) {
  //   for (let col = 0; col < squares[0].length; ++col) {
  //     const character = squares[row][col];

  //     rowScores[row] += character;
  //     colScores[col] += character;

  //     if (row === col) {
  //       diagonal += 1;
  //     }
  //     if (col === squares.length - row - 1) {
  //       antiDiagonal += 1;
  //     }

  //     if (Math.abs(rowScores[row]) === squares.length) {
  //       return rowScores[0];
  //     }
  //     if (Math.abs(colScores[col]) === squares.length) {
  //       return rowScores[0]
  //     }

  //     //   }
  //     //   Math.abs(colScores[col]) === squares.length ||
  //     //   Math.abs(diagonal) === squares.length ||
  //     //   Math.abs(antiDiagonal) === squares.length
  //     //  {
  //     //   return true;
  //   }
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
  return emptySquares;
};
export const isEmpty = (grid) => {
  return getEmptySquares(grid).length === 0;
};
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
};
export const makeMove = (grid, square, player) => {
  const [row, col] = square;
  if (grid[row][col] === null) {
    grid[row][col] = player;
  }
};

import { PLAYER_O, PLAYER_X } from "./constants";
// private boolean didWin(char[][] board, int row, int col, char player){
//   //check the current row
//   boolean didPlayerWin = true;
//   for(int i = 0; i < n; i++){
//       if(board[row][i] != player){
//           didPlayerWin = false;
//       }
//   }
//   if(didPlayerWin) return true;   //player has won the game

//   //check the current col
//   didPlayerWin = true;
//   for(int i = 0; i < n; i++){
//       if(board[i][col] != player){
//           didPlayerWin = false;
//       }
//   }
//   if(didPlayerWin) return true;   //player has won the game

//   //check reverse diagonal
//   if(col == n - row - 1){
//       didPlayerWin = true;
//       for(int i = 0; i < n; i++){
//           if(board[i][n-i-1] != player){
//               didPlayerWin = false;
//           }
//       }
//       if(didPlayerWin) return true;   //player has won the game
//   }

//   //player did not win
//   return false;
// }

export function calculateWinner(squares, amtRequiredToWin) {
  /*
    0 0 0  
    0 0 0 
    0 0 0

    0 0 0 
    0 0 0 

    0 0 
    0 0
    0 0

  */
  let horizontalCheck = 0;
  let verticalCheck = 0;
  //  If amount of rows is less than the continuous streak to win then only check horizontally
  if (squares.length < amtRequiredToWin) {
    for (let row = 0; row < squares.length; ++row) {
      horizontalCheck = amtRequiredToWin;
      for (let col = 0; col < squares[0].length; ++col) {
        if (squares[row][0] === squares[row][col]) {
          --horizontalCheck;
        }
      }
      if (horizontalCheck === 0) {
        return squares[row][0];
      }
    } // If amount of columns is less than amtRequiredToWin then only check vertically
  } else if (squares[0].length < amtRequiredToWin) {
    for (let col = 0; col < squares[0].length; ++col) {
      verticalCheck = amtRequiredToWin;
      for (let row = 0; row < squares.length; ++row) {
        if (squares[0][col] === squares[row][col]) {
          --verticalCheck;
        }
      }
      if (verticalCheck === 0) {
        return squares[0][col];
      }
    }
  } else {
    // Horizontal check
    for (let row = 0; row < squares.length; ++row) {
      horizontalCheck = amtRequiredToWin;
      for (let col = 0; col < squares[0].length; ++col) {
        if (squares[row][0] === squares[row][col]) {
          --horizontalCheck;
        }
      }
      if (horizontalCheck === 0) {
        // return squares[row][0];
        console.log(squares[row][0]);
      }
    }
    // Vertical Check
    for (let col = 0; col < squares[0].length; ++col) {
      verticalCheck = amtRequiredToWin;
      for (let row = 0; row < squares.length; ++row) {
        if (squares[0][col] === squares[row][col]) {
          --verticalCheck;
        }
      }
      if (verticalCheck === 0) {
        // return squares[0][col];
        console.log(squares[0][col]);
      }
    }

    // var a = new Array();
    // var b = 0;

    squares = [
      [5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8],
      [3, 4, 5, 6, 7],
      [2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5],
    ];
    
    // Diagonal Check
    // # of rows
    var m = squares.length;
    // # of cols
    var n = squares[0].length;

    let diagonalCheck = Math.min(m, n);

    var out = [];
    for (var i = 1 - m; i < n; i++) {
      var group = [];
      for (var j = 0; j < m; j++) {
        if (i + j >= 0 && i + j < n) {
          group.push(squares[j][i + j]);
        }
      }
      out.push(group);
    }

    console.log("out", out);
    for (let i = 0; i < out.length; ++i) {
      if (out[i].length === diagonalCheck) {
        if (out[i].every((element, index, arr) => element === arr[0])) {
          // return out[i][0];
          console.log(out[i][0]);
        }
      }
    }

    squares = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
      [3, 4, 5, 6, 7],
      [4, 5, 6, 7, 8],
      [5, 6, 7, 8, 9],
    ];

    // Reverse Diagonal check
    m = squares.length;
    n = squares[0].length;
    out = [];
    for (let slice = 0; slice < m + n - 1; ++slice) {
      let z1 = slice < n ? 0 : slice - n + 1;
      let z2 = slice < m ? 0 : slice - m + 1;
      group = [];
      for (let j = slice - z2; j >= z1; --j) {
        group.push(squares[j][slice - j]);
      }
      out.push(group);
    }
    console.log("out1", out);
    for (let i = 0; i < out.length; ++i) {
      if (out[i].length === diagonalCheck) {
        if (out[i].every((element, index, arr) => element === arr[0])) {
          // return out[i][0];
          console.log(out[i][0]);
        }
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

import { SCORES } from "./constants";
import {
  switchPlayer,
  calculateWinner,
  getEmptySquares,
  cloneGrid,
  makeMove,
} from "./helpers";

export const minimax = (board, player) => {
  const mult = SCORES[player];
  let thisScore;
  let maxScore = -1;
  let bestMove = null;
  const winner = calculateWinner(board);
  if (winner !== null) {
    return [SCORES[winner], 0];
  } else {
    for (let empty of getEmptySquares(board)) {
      let copy = cloneGrid(board);

      // Pass in empty square
      makeMove(copy, empty, player);
      thisScore = mult * minimax(copy, switchPlayer(player))[0];

      if (thisScore >= maxScore) {
        maxScore = thisScore;
        bestMove = empty;
      }
    }

    return [mult * maxScore, bestMove];
  }
};

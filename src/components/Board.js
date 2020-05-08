import React from "react";
import Square from "./Square";
import { Box } from "@material-ui/core";
import { DIMS_LENGTH, DIMS_WIDTH, PLAYER_X } from "../constants";
const Board = ({ squares, onClick }) => {
  const getEmptySquares = (grid) => {
    let emptySquares = [];
    grid.forEach((row, i) => {
      row.forEach((ele, j) => {
        if (ele === null) {
          emptySquares = [...emptySquares, [i, j]];
        }
      });
    });
    console.log(emptySquares);
    return emptySquares;
  };
  const isEmpty = (grid) => {
    return grid.getEmptySquares === DIMS_LENGTH * DIMS_WIDTH;
  };
  const clone = () => {
    return squares.map((arr) => arr.slice());
  };
  return (
    <div>
      {squares.map((row, i) => {
        return (
          <Box display="flex" justifyContent="center" key={i}>
            {row.map((col, j) => {
              let borderTop;
              let borderLeft;
              let borderBottom;
              let borderRight;
              const activeSquare = col !== null;
              if (i === 0) {
                borderBottom = 1;
                if (j === 0 || j !== row.length - 1) {
                  borderRight = 1;
                }
              } else if (i === squares.length - 1) {
                if (j === 0 || j !== row.length - 1) {
                  borderRight = 1;
                }
              } else {
                borderRight = 1;
                borderBottom = 1;
                if (j === row.length - 1) {
                  borderRight = 0;
                }
              }
              return (
                <Square
                  value={activeSquare && (col === PLAYER_X ? "X" : "O")}
                  borderLeft={borderLeft}
                  borderBottom={borderBottom}
                  borderTop={borderTop}
                  borderRight={borderRight}
                  key={(i, j)}
                  onClick={() => onClick(i, j)}
                />
              );
            })}
          </Box>
        );
      })}
    </div>
  );
};

export default Board;

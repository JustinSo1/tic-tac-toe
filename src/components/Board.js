import React from "react";
import Square from "./Square";
import { Box } from "@material-ui/core";
import { PLAYER_X } from "../constants";
const Board = ({ squares, onClick }) => {
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

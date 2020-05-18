import React from "react";
import Square from "./Square";
import { Box } from "@material-ui/core";
import { PLAYER_X } from "../constants";
const Board = ({ squares, onClick }) => {
  return (
    <div>
      {squares.map((row, i) => {
        // Handles corner cases then makes everything else a box border
        return (
          <Box display="flex" justifyContent="center" key={i}>
            {row.map((col, j) => {
              let borderTop;
              let borderLeft;
              let borderBottom;
              let borderRight;
              const activeSquare = col !== null;
              // For first row always allow bottom border
              if (i === 0) {
                borderBottom = 1;
                // For every column except the last make border right
                if (j !== row.length - 1) {
                  borderRight = 1;
                }
                // Make a right border for every column except the last 
              } else if (i === squares.length - 1) {
                if (j !== row.length - 1) {
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

import React from "react";
import Box from "@material-ui/core/Box";
import { SQUARE_DIMS } from "../constants";

const defaultProps = {
  // bgcolor: "grey.300",
  color: "black",
  p: 1,
  // m: 1,
  borderColor: "primary",
  width: SQUARE_DIMS,
  height: SQUARE_DIMS,
  fontSize: SQUARE_DIMS,
  textAlign: "center",
};

const Square = ({
  value,
  onClick,
  borderTop,
  borderBottom,
  borderRight,
  borderLeft,
}) => (
  <Box
    {...defaultProps}
    onClick={onClick}
    borderTop={borderTop}
    borderBottom={borderBottom}
    borderLeft={borderLeft}
    borderRight={borderRight}
  >
    {value}
  </Box>
);
export default Square;
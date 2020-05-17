export const SQUARE_DIMS = 150;
// export const DIMS_WIDTH = Math.floor(Math.random() * 5) + 2;
// export const DIMS_LENGTH = Math.floor(Math.random() * 5) + 2;
export const DIMS_WIDTH = 3;
export const DIMS_LENGTH = 3;

export const DRAW = 0;
export const PLAYER_X = 1;
export const PLAYER_O = 2;
export const GAME_STATES = {
  notStarted: "not_started",
  inProgress: "in_progress",
  over: "over",
};
export const SCORES = {
  1: 1,
  0: 0,
  2: -1,
};
export const GAME_MODES = {
  easy: "easy",
  medium: "medium",
  difficult: "difficult",
};
export const marks = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,

    label: "10",
  },
]
export const minSize = 2;
export const maxSize = 10;

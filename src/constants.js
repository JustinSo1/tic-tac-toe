export const SQUARE_DIMS = 100;
export const DIMS_WIDTH = Math.floor(Math.random() * 5) + 2;
export const DIMS_LENGTH = Math.floor(Math.random() * 5) + 2;
// export const DIMS_WIDTH = 3;
// export const DIMS_LENGTH = 3;

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

const playersRouter = require("express").Router();
const Player = require("../models/player");

playersRouter.get("/", async (request, response) => {
  const users = await Player.find({});
  response.json(users.map((u) => u.toJSON()));
});
playersRouter.post("/", async (request, response) => {
  const body = request.body;

  const player = new Player({
    name: body.name,
    score: body.score,
  });
  const savedPlayer = await player.save();

  response.json(savedPlayer);
});

module.exports = playersRouter;

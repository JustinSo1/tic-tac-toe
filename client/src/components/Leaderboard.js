import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import leaderboardService from "../services/leaderboard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Leaderboard = () => {
  const [leaderboardPlayers, setLeaderboardPlayers] = useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    leaderboardService.getAll().then((initialPlayers) => {
      setLeaderboardPlayers(initialPlayers);
    });
  }, []);

  if (!leaderboardPlayers || leaderboardPlayers.length === 0) {
    return <h1>Leaderboard is loading</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Scores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardPlayers.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;

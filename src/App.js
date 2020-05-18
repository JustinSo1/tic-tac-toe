import React, { useState } from "react";
import Game from "./components/Game";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const App = () => {
  const [theme, setTheme] = useState({
    palette: {
      type: "light",
    },
  });
  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType,
      },
    });
  };
  const muiTheme = createMuiTheme(theme);

  return (
    /* Adds dark theme to App */
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Game toggleDark={toggleDarkTheme} />
    </MuiThemeProvider>
  );
};

export default App;

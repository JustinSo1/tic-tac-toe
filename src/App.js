import React from "react";
import Game from "./components/Game";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme, ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Game />
    </ThemeProvider>
  );
};

export default App;

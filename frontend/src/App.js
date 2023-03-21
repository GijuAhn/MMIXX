import theme from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

import { Router } from 'router'
import { NavBar } from "components/navbar";
import { PlayBar } from "components/playbar";

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavBar />
      <Router />
      <PlayBar />
    </ThemeProvider>
  );
};

export default App;
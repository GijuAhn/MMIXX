import theme from "styles/theme";

import { Router } from 'router'
import GlobalStyle from "styles/GlobalStyle";
import { NavBar } from "components/navbar";
import { ThemeProvider } from "styled-components";

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavBar />
      <Router />
    </ThemeProvider>
  );
};

export default App;
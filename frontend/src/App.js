import { RecoilRoot } from "recoil";

import theme from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

import { Router } from 'router'
import { NavBar } from "components/NavBar";
import { PlayBar } from "components/PlayBar";

const App = () => {

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NavBar />
        <Router />
        <PlayBar />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
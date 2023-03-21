import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Main, 
  Playlist, 
  Mix
} from 'pages'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/mix" element={<Mix />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
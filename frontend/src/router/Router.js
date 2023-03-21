import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Main, 
  Playlist, 
  Mix,
  MyMusic
} from 'pages'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/mix" element={<Mix />} />
        <Route path="/mymusic" element={<MyMusic />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
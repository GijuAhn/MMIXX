import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  Main, 
  Playlist, 
  Mix,
  MyMusic,
  Template,
  NotFound
} from 'pages'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route path="" element={<Main />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="mix" element={<Mix />} />
          <Route path="mymusic" element={<MyMusic />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
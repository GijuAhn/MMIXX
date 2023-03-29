import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Template,
  Main, 
  Mix,
  MyMusic,
  Playlist, 
  PlaylistCreate,
  PlaylistSelectMusic,
  PlaylistDetail,
  PlaylistEdit,
  NotFound,
  Test
} from 'pages'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route path="" element={<Main />} />
          <Route path="mix" element={<Mix />} />
          <Route path="mymusic" element={<MyMusic />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="playlist/create" element={<PlaylistCreate />} />
          <Route path="playlist/:playlistSeq" element={<PlaylistDetail />} />
          <Route path="playlist/edit" element={<PlaylistEdit />} />
          <Route path="playlist/select" element={<PlaylistSelectMusic />} />
          <Route path="playlist/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
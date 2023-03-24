import { useState, useEffect } from "react";
import styled from "styled-components";
import { getMusicList, getMusicListByCondition } from "api/mymusic";
import MusicListItem from "./MusicListItem";

const MusicList = ({ filter = "x", order = "x", query = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [musicList, setMusicList] = useState([]);
  // const [page, setPage] = useState(1);
  // const [getSearch, setGetSearch] = useState(false);
  // useEffect(() => {
  //   getMusicListByCondition(filter, order, query)
  //     .then((result) => {
  //       // console.log(result.content);
  //       setMusicList(result.content);
  //     })
  //     .then(() => setIsLoading(false));
  // }, [filter, order, query]);
  useEffect(() => {
    getMusicList()
      .then((result) => {
        console.log(result.content);
        setMusicList(result.content);
        // setMusicList((currentArray) => [...currentArray, ...result.content]);
      })
      .then(() => setIsLoading(false));
  }, []);
  const getNexPage = () => {};
  return (
    <div>
      {isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <Table>
          <tbody>
            {musicList.map((music) => (
              <MusicListItem
                key={music.musicSeq}
                musicSeq={music.musicSeq}
                coverImage={music.coverImage}
                mixed={music.mixed}
                musicName={music.musicName}
                musicianName={music.musicianName}
                albumName={music.albumName}
                musicLength={music.musicLength}
              ></MusicListItem>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

const Table = styled.table`
  display: block;
  border-collapse: separate;
  border-spacing: 0 10px;
  &td:first-child {
    border-radius: 10px 0 0 10px;
  }
  &td:last-child {
    border-radius: 10px 0 0 10px;
  }
`;

export default MusicList;

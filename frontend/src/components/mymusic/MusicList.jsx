import { useState, useEffect } from "react";
import useDidMountEffect from "components/myMusic/useDidMountEffect";
import styled from "styled-components";
import { getMusicList, getMusicListByCondition } from "api/mymusic";
import MusicListItem from "./MusicListItem";

const MusicList = ({ filter, order, query }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [musicList, setMusicList] = useState([]);
  const [musicList, setMusicList] = useState([
    {
      musicSeq: 1,
      coverImage: null,
      mixed: null,
      musicName: "Ditto",
      musicianName: "New Jeans",
      albumName: "앨범이름",
      musicLength: 36000,
    },
  ]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    // getMusicList()
    //   .then((result) => {
    //     console.log(result.content);
    //     setMusicList(result.content);
    //   })
    //   .then(() => setIsLoading(false));
    setIsLoading(false);
    // length === 0이면 내가 업로드 한 곡 없음. 곡 업로드 곡 추가 해보세요
  }, []);

  useDidMountEffect(() => {
    console.log(`query: ${query}, filter: ${filter}, order: ${order}`);
    // setMusicList((currentArray) => [...currentArray, ...result.content]);
    // getMusicListByCondition(filter, order, query).then((result) => {
    //   // console.log(result.content);
    //   setMusicList(result.content);
    // });
  }, [filter, order, query]);

  // const getNexPage = () => {};

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

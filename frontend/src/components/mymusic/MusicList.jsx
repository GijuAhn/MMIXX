import { useState, useEffect } from "react";
import styled from "styled-components";
import restApi from "api/mymusic"; // TODO
import MusicListItem from "./MusicListItem";

const MusicList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [musicList, setMusicList] = useState([]);
  useEffect(() => {
    const getMusicList = async () => {
      const { data } = await restApi.get(`/api/music`); // 수정하기
      return data;
    };
    getMusicList()
      .then((result) => setMusicList(result.content))
      .then(() => setIsLoading(false));
  }, []);
  return (
    <div>
      {isLoading ? (
        <strong>Loading...</strong>
      ) : (
        // <table className={styles.row}>
        //  <table>
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
      {/* <Body>
        <h2>PlayBar</h2>
      </Body> */}
    </div>
  );
};

const Table = styled.table`
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

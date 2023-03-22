import { useState, useEffect } from "react";
import styled from "styled-components";
import restApi from "api/mymusic"; // TODO

const MusicList = () => {
  // if (window.location.pathname === "/mix" || window.location.pathname === "/") {
  //   return null;
  // }
  const [isLoading, setIsLoading] = useState(true);
  const [musicList, setMusicList] = useState([]);
  // (1)
  // useEffect(() => {
  //   restApi.get(`/api/music?page=2`).then(({ data }) => {
  //     // setMusicList(data.content);
  //     // console.log(data.content);
  //     // console.log("musicList는: ", musicList);
  //     // https://nomadcoders.co/react-for-beginners/lectures/3286
  //     setMusicList((currentArray) => {
  //       // const newArray = [...currentArray, ...data.content];
  //       const newArray = [...data.content];
  //       console.log("...newArray는: ", newArray);
  //       return newArray;
  //     });
  //     console.log("...musicList는: ", musicList);
  //     setIsLoading(false);
  //   });
  // }, []); // []이면 첫 렌더링될 때 한번만
  // (2)
  useEffect(() => {
    const getMusicList = async () => {
      const { data } = await restApi.get(`/api/music`);
      return data;
    };
    getMusicList()
      .then((result) => setMusicList(result.content))
      .then(() => setIsLoading(false));
  }, []); // []이면 첫 렌더링될 때 한번만
  // (3)
  // const getMusicList = async () => {
  //   const { data } = await restApi.get(`/api/music`);
  //   setMusicList(data.content);
  //   // console.log(musicList); // 빈 배열. 근데 list로 잘 나옴..
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   getMusicList();
  // }, []); // []이면 첫 렌더링될 때 한번만
  return (
    <div>
      {isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          {musicList.map((music) => (
            <div key={music.musicSeq}>{music.musicName}</div>
          ))}
        </div>
      )}

      <Body>
        <h2>PlayBar</h2>
      </Body>
    </div>
  );
};

const Body = styled.div`
  width: ${(props) => window.innerWidth - 300}px;
  border: 1px solid blue;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 150px;
  filter: drop-shadow(0px -25px 100px rgba(16, 16, 16, 0.51));
`;

export default MusicList;

import { Wrapper, Header } from "components/Common"
import styled from "styled-components";
// import { useEffect, useState } from "react";
// import CustomTable from "components/mymusic/CustomTable";
import { SelectMusicItem } from "components/Mix";
import { testPlaylistMusic } from "atom/atom";
import { useRecoilValue } from "recoil";

// import { getMusicList } from "api/mymusic";

const PlaylistSelectMusic = () => {
  const playList = useRecoilValue(testPlaylistMusic)
  // console.log('playList :', playList)
  const musicList = playList.playlistMusic
  // console.log('musicList :', musicList)
  // console.log('music :', musicList[0].music)
  // const [musicList, setMusicList] = useState();
  // useEffect(() => {
  //   getMusicList()
  //   .then( res => setMusicList(res.data) )
  //   .catch( err => console.log(err) )
  // },[])

  return (
    <Wrapper>
      <Header 
        title="Music Select"
        desc="노래 고르기"
      />
      <MusicItemWrapper>
        { musicList.map((music, index) => {
          console.log('music :', music, 'index : ',index+1)
          return (
            <SelectMusicItem 
            key={index+1} 
            music={music}
            hasIcon='false'
            />
          )
        })}
      </MusicItemWrapper>
      {/* <CustomTable musicList={musicList} hasIcon={false}>
      </CustomTable> */}
    </Wrapper>
  );
};

export default PlaylistSelectMusic;

const MusicItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding-left: 3px;
`

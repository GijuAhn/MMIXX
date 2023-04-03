import { Wrapper, Header, DefaultBtn } from "components/Common"
// import { useEffect, useState } from "react";
// import CustomTable from "components/mymusic/CustomTable";
import { SelectMusicItem } from "components/Mix";
import { testPlaylistMusic } from "atom/atom";
import { useRecoilValue } from "recoil";
import { useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components"
import { useState } from "react";
import { isLogIn, userInfo } from 'atom/atom';
import { postPlaylist } from 'api/playlist';

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

  const { state } = useLocation()
  const playlistTitle = state.playlistTitle
  console.log(playlistTitle);
  const atomUser = useRecoilValue(userInfo)
  const [playListDto, setPlayListDto] = useState([]);

  const plyMusicList =
  [
    {
      "music_seq": 1,
      "sequence": 1
    },
    {
      "music_seq": 2,
      "sequence": 2
    }
  ];

  // [Test] 곡 선택하기 (check box)
  const [checkedList, setCheckedList] = useState([]);


  // 선택 완료 버튼 누르면 플레이리스트 생성
  const onClickLogin = () => {
    // console.log(plyMusicList);
    setPlayListDto([
      {
        playlist_name: playlistTitle,
        is_private: state.isPrivate,
        user_seq: atomUser.userSeq,
        playlist_music: checkedList
      }
    ]);
    // console.log(playListDto);
    postPlaylist(
       {data :{playlist_name: playlistTitle,
      is_private: state.isPrivate,
      user_seq: atomUser.userSeq,
      playlist_music: plyMusicList}
    });

  };

  return (
    <Wrapper>
      <Header 
        title="Music Select"
        desc="노래 고르기"
      />
      { musicList.map((music, index) => {
        // console.log('music :', music, 'index : ',index+1)
        return (
          <SelectMusicItem 
            key={index+1} 
            music={music}
            hasIcon='false'
            />
          )
        })}

      {/* <CustomTable musicList={musicList} hasIcon={false}>
      </CustomTable> */}

      <CreateBtn onClick={onClickLogin}>
        선택 완료
      </CreateBtn>
      {/* <button onClick={() => console.log(checkedList)}>추가하기</button>
      <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList> */}
    </Wrapper>
  );
};

const CreateBtn = styled(DefaultBtn)`
`

export default PlaylistSelectMusic;

const MusicItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding-left: 3px;
`
const SelectBox = styled.div`
  
`

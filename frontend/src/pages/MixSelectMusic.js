import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "atom/atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components"

import { SelectMusicItem } from "components/Mix";
import { Wrapper, Header, DefaultBtn } from "components/Common"

import { getMusicList } from 'api/mymusic';
import { MusicList } from "components/mymusic";

// import { getMusicList } from "api/mymusic";

const MixSelectMusic = () => {
  const navigate = useNavigate();
  // const playList = useRecoilValue(testPlaylistMusic)
  // console.log('playList :', playList)
  // const musicList = playList.playlistMusic
  // const [selMusicSeq, setSelMusicSeq] = useState('')

  // const selectedMusicSeq = (x) => {
  //   setSelMusicSeq(x)
  //   console.log('선택한 음악 시퀀스 : ', x)
  // }
  // useEffect(() => {
  //   console.log('선택한 음악 시퀀스 확인',selMusicSeq)
  //   // console.log('선택한 음악 정보 ', selMusicSeq ? musicList[selMusicSeq].music : null)
  //   // setSelMusicInfo(selMusicSeq ? musicList[selMusicSeq].music : null)
  // }, [selMusicSeq])

  // [Test] 곡 선택하기 (radio)
  const [selectedMusic, setSelectedMusic] = useState({
    musicSeq: null,
    coverImage: null,
    musicName: null,
    musicianName: null,
  });

  return (
    <MusicItemWrapper>
      <Header 
        title="Music Select"
        desc="믹스할 노래 고르기"
      />
      <MusicList radio={true} checkMusic={setSelectedMusic}></MusicList>
      {/* { musicList && musicList.map((music, index) => {
        // console.log('music :', music, 'index : ',index+1)
        return (
          <SelectMusicItem
            selectedMusicSeq={selectedMusicSeq}
            key={index+1} 
            music={music}
            selNum={selMusicSeq}
            hasIcon='false'
            />
          )
        })} */}

      <CreateBtn 
        onClick={() => 
          navigate('/mix', { 
          state: {selectedMusic}
        })
      }>
        선택 완료
      </CreateBtn>
      {/* <button onClick={() => console.log(checkedList)}>추가하기</button>
      <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList> */}
    </MusicItemWrapper>
  );
};


export default MixSelectMusic;

const MusicItemWrapper = styled(Wrapper)`
display: flex;
flex-direction: column;
width: 80vw;
padding-left: 3px;
`
const CreateBtn = styled(DefaultBtn)`
`
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { testPlaylistMusic } from "atom/atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components"

import { SelectMusicItem } from "components/Mix";
import { Wrapper, Header, DefaultBtn } from "components/Common"

import { getMusicList } from 'api/playlist';

// import { getMusicList } from "api/mymusic";

const MixSelectMusic = () => {
  const navigate = useNavigate();
  const playList = useRecoilValue(testPlaylistMusic)
  // console.log('playList :', playList)
  const musicList = playList.playlistMusic
  // console.log('musicList :', musicList)
  // console.log('music :', musicList[0].music)

  const [selMusicSeq, setSelMusicSeq] = useState('')
  const [selMusicInfo, setSelMusicInfo] = useState([])

  // 음악 데이터 가져오기 api
  // const [musicList, setMusicList] = useState();
  // useEffect(() => {
  //   getMusicList(userSeq, page = 1)
  //   .then( res => setMusicList(res.data) )
  //   .catch( err => console.log(err) )
  // },[])
  const selectedMusicSeq = (x) => {
    setSelMusicSeq(x)
    console.log('선택한 음악 시퀀스 : ', x)
  }
  useEffect(() => {
    console.log('선택한 음악 시퀀스 확인',selMusicSeq)
    console.log('선택한 음악 정보 ', selMusicSeq ? musicList[selMusicSeq].music : null)
    setSelMusicInfo(selMusicSeq ? musicList[selMusicSeq].music : null)
  }, [selMusicSeq])

  return (
    <MusicItemWrapper>
      <Header 
        title="Music Select"
        desc="믹스할 노래 고르기"
      />
      {/* <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList> */}
      { musicList.map((music, index) => {
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
        })}

      <CreateBtn 
        onClick={() => 
          navigate('/mix', { 
          state: { 
            coverImage : selMusicInfo.coverImage, 
            musicName : selMusicInfo.musicName, 
            musicianName : selMusicInfo.musicianName, 
            musicSeq : selMusicInfo.musicSeq 
          }
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
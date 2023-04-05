import { Wrapper, Header, DefaultBtn } from "components/Common";
import { testPlaylistMusic } from "atom/atom";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { userInfo } from "atom/atom";
import { postPlaylist, insertMusicInPlaylist } from "api/playlist";
import { MusicList } from "components/mymusic";

const PlaylistSelectMusic = () => {
  const navigate = useNavigate();
  // const playList = useRecoilValue(testPlaylistMusic);

  const { state } = useLocation();
  const playlistTitle = state.playlistTitle;
  // console.log(playlistTitle);
  const atomUser = useRecoilValue(userInfo);

  // [Test] 곡 선택하기 (check box)
  const [checkedList, setCheckedList] = useState([]);

  const { type } = useParams();
  console.log(type);

  // 선택 완료 버튼 누르면 플레이리스트 생성
  const onClickLogin = () => {
    console.log(checkedList);
    if (type === "create") {
      postPlaylist(atomUser.userSeq, {
        playlist_name: playlistTitle,
        is_private: state.isPrivate,
        user_seq: atomUser.userSeq,
        playlist_music: checkedList,
      }).then((res) =>
        navigate(`/playlist/${res.data}`, {
          state: {
            playlistTitle: `${playlistTitle}`,
            isPrivate: `${state.isPrivate}`,
          },
        })
      );
    } else {
      insertMusicInPlaylist(atomUser.userSeq, state.playlistSeq, {
        playlist_music: state.playlistMusic,
        add_music: checkedList,
      }).then(navigate(`/playlist/${state.playlistSeq}`));
    }
  };

  console.log('playlistTitle :', playlistTitle)

  return (
    <Wrapper>
      <Header title='Music Select' desc='노래 고르기' />
      <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList>
      <CreateBtn onClick={onClickLogin}>선택 완료</CreateBtn>
    </Wrapper>
  );
};

const CreateBtn = styled(DefaultBtn)`
  position: fixed;
  bottom: -20px;
`;

export default PlaylistSelectMusic;

const MusicItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding-left: 3px;
`;
const SelectBox = styled.div``;

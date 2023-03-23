import { Content } from "components/Common";
import MusicList from "components/myMusic/MusicList";
import MusicSearch from "components/myMusic/MusicSearch";

const MyMusic = () => {
  return (
    <Content>
      <h2>MyMusic</h2>
      <MusicSearch></MusicSearch>
      <MusicList></MusicList>
    </Content>
  );
};

export default MyMusic;

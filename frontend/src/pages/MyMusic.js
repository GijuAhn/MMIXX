import { Content } from "components/Common";
import Music from "components/myMusic/Music";
import MusicUploadBtn from "components/myMusic/MusicUploadBtn";

const MyMusic = () => {
  return (
    <Content>
      <h2>MyMusic</h2>
      <MusicUploadBtn></MusicUploadBtn>
      <Music></Music>
    </Content>
  );
};

export default MyMusic;

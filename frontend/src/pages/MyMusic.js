// import { Content } from "components/Common";
// import Music from "components/myMusic/Music";
// import MusicUploadBtn from "components/myMusic/MusicUploadBtn";

// const MyMusic = () => {
//   return (
//     <Content>
//       <h2>MyMusic</h2>
//       <MusicUploadBtn></MusicUploadBtn>
//       <Music></Music>
//     </Content>
import { Wrapper, Header } from "components/Common";

const MyMusic = () => {
  return (
    <Wrapper>
      <Header title="MyMusic" desc="내 음악 들어보기" />
    </Wrapper>
  );
};

export default MyMusic;

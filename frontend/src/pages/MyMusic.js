import { Wrapper, Header } from "components/Common";
import Music from "components/mymusic";

const MyMusic = () => {
  return (
    <Wrapper>
      <Header title="MyMusic" desc="내 음악 들어보기" />
      <Music></Music>
    </Wrapper>
  );
};

export default MyMusic;

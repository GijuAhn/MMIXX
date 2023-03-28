import { Wrapper, Header } from "components/Common";
// import { Carousel } from "components/Mix/carousel";
import { Carousel } from 'react-carousel3';
import { PresetCard } from "components/Mix";
import { MusicInfo } from "components/Mix";
// import { Button } from "@mui/material";
// import { PlainBtn } from "components/Common";
import { DefaultBtn } from "components/Common";
import { Navigate, useNavigate } from "react-router-dom";

const style = {
  width: 400,
  height: 300,
};

const Mix = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header 
        title="MIX"
        desc="음악 믹스하기"  
        />
        {/* 우측 상단에 띄워놓을 동그래미 */}
        <MusicInfo>
        </MusicInfo>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // background: 'linear-gradient(to bottom, #16235e 0%, #020223 100%)',
        }}
      >
      <Carousel height={500} width={600} xOrigin={150} yOrigin={60} yRadius={1} autoPlay={false}>
        <div key={1} style={style}>
          <PresetCard></PresetCard>
        </div>
        <div key={2} style={style}>
          <PresetCard></PresetCard>
        </div>
        <div key={3} style={style}>
          <PresetCard></PresetCard>
        </div>
        <div key={4} style={style}>
          <PresetCard></PresetCard>
        </div>
        <div key={5} style={style}>
          <PresetCard></PresetCard>
        </div>
      </Carousel>
      </div>
      <DefaultBtn 
        onClick={ () => navigate("/mix/result")}
      >변환하기</DefaultBtn>
    </Wrapper>
  );
};

export default Mix;
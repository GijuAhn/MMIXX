import { Wrapper, Header } from "components/Common";
// import { Carousel } from "components/Mix/carousel";
import { Carousel } from 'react-carousel3';
import { PresetCard } from "components/Mix";
import { MusicInfo } from "components/Mix";
import { useState, useEffect } from "react";
// import { Button } from "@mui/material";
// import { PlainBtn } from "components/Common";
import { DefaultBtn } from "components/Common";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPreset, getGenreDetail } from 'api/genre';
import { BorderColor } from "@mui/icons-material";
import { musicMix } from "api/mix";
const style = {
  width: 400,
  height: 300,
};
const musicInfo = {
  position: "absolute",
  top: "7rem",
  left: "-26rem"
  // border: '2px solid',
  // BorderColor: 'white'
}
const btn = {
  position: "absolute",
  bottom: "5rem",
  right: "5rem"
}

const Mix = () => {
  const navigate = useNavigate();
  const [presetData, setPresetData] = useState('')
  useEffect(() => {
    getPreset(1)
      .then(res => setPresetData(res), console.log(presetData))
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    console.log('결과값 확인 : ', presetData) 
  }, [presetData]);
  return (
    <Wrapper>
      <Header 
        title="MIX"
        desc="음악 믹스하기"  
        />
        {/* 우측 상단에 띄워놓을 동그래미 */}
      <div style={musicInfo}>
      <MusicInfo>
      </MusicInfo>
      </div>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // background: 'linear-gradient(to bottom, #16235e 0%, #020223 100%)',
        }}
      > */}
      <Carousel height={500} width={600} xOrigin={150} yOrigin={60} yRadius={30} autoPlay={false}>
        {/* // const preset_name = props.preset_name
            // const preset_summary = props.preset_summary
            // const preset_info = props.preset_info
            const preset_image = props.preset_image */}
        <div key={1} style={style}>
          <PresetCard
            preset_name='밝은'
            preset_image=''
          ></PresetCard>
        </div>
        <div key={2} style={style}>
          <PresetCard
            preset_name='신나는'
          ></PresetCard>
        </div>
        <div key={3} style={style}>
          <PresetCard
            preset_name='편안한'
          ></PresetCard>
        </div>
        <div key={4} style={style}>
          <PresetCard
            preset_name='조용한'
          ></PresetCard>
        </div>
        <div key={5} style={style}>
          <PresetCard
            preset_name='힘있는'
          ></PresetCard>
        </div>
      </Carousel>
      {/* </div> */}
      <DefaultBtn 
        style={btn}
        onClick={ () => {
          navigate("/mix/result")
          musicMix(1, 2)
        }}
      >변환하기</DefaultBtn>
    </Wrapper>
  );
};

export default Mix;
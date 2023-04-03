import styled from "styled-components";
import { Carousel } from 'react-carousel3';
import { useNavigate, useLocation } from "react-router-dom";

import { Wrapper, Header } from "components/Common";
import { PresetCard } from "components/Mix";
import { MusicInfo } from "components/Mix";
import { useState, useEffect } from "react";
import { DefaultBtn } from "components/Common";

import { getPreset } from 'api/genre';

const Mix = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const coverImage = location.state && location.state.coverImage;
  const musicName = location.state && location.state.musicName;
  const musicianName = location.state && location.state.musicianName;
  const musicSeq = location.state && location.state.musicSeq;
  const musicSelected = !location.state
  const [presetSeq, setPresetSeq] = useState('');
  const [presetData, setPresetData] = useState('');

  const presetSeqFunc = (x) => {
    setPresetSeq(x)
    console.log('선택한 프리셋 번호 : ',x)
  }

  useEffect(() => {
    console.log('******* 믹스할 음악 *******')
    console.log(musicSelected)
    console.log(musicName)
    console.log(musicianName)
    console.log('****************************')
    getPreset()
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log('프리셋 데이터 확인 : ', presetData) 
  }, [presetData]);

  return (
    <Wrapper>
      <HeadContent>
        <Header 
          style={{ width: 500 }}
          title="MIX"
          desc="음악 믹스하기" 
          help="도움말"
          helpDesc={"믹스하기는 프리셋의 곡 분위기를 참조하여 음악의 스타일을 변환하는 기능입니다. 프리셋을 선택한 후 음악 스타일을 변환해보세요."}
          />
      </HeadContent>
      <Music>
        {/* {musicSelected ? 'true' : 'false'} */}
        { !musicSelected ? (<MusicInfo
            // props 보내기
            coverImage={coverImage}
            musicName={musicName}
            musicianName={musicianName}
          > </MusicInfo>) : (<DefaultBtn
            onClick={ () => navigate('/mix/select') }>
            곡 선택</DefaultBtn>)}
      </Music>
      <p> 원하는 프리셋을 선택하세요. </p>
      <Carousel children={PresetCard} height={"40vh"} width={"60vw"} xOrigin={100} yOrigin={0} yRadius={0} autoPlay={false}>
        {/* // const preset_name = props.preset_name
            // const preset_summary = props.preset_summary
            // const preset_info = props.preset_info
            const preset_image = props.preset_image */}

        {/* 컴포넌트 반복 코드 */}
        {/* <div key={1} style={{width: 400, height: 250}}>
        { presetData && presetData.map((preset) =>  {
          return (
            <div onClick={() => setPresetSeq(preset.presetSeq)}>
              <PresetCard
                presetSeqFunc={presetSeqFunc}
                presetNum={preset.presetSeq}
                presetName={preset.presetName}
                musicName={preset.musicName}
                musicLength={preset.musicLength}
                musicianName={preset.musicianName}
                albumName={preset.albumName}
                presetUrl={preset.presetUrl}
                converImage={preset.converImage}
                selNum = {presetSeq}
              ></PresetCard>
            </div>
              )
            })}
        </div> */}
        <div key={1} style={presetStyle} onClick={() => console.log('나야나')}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='밝은'
            presetNum={1}
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={2} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='신나는'
            presetNum={2}
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={3} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='편안한'
            presetNum={3}
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={4} style={presetStyle}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='강렬한'
            presetNum={4}
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={5} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='힘있는'
            presetNum={5}
            selNum = {presetSeq}
          ></PresetCard>
        </div>
      </Carousel>
      
      <ButtonStyle>
        <DefaultBtn 
          onClick={ () => {
            navigate('/mix/result', { state: { musicSeq:musicSeq, presetSeq:presetSeq } })
          }}
        >변환하기</DefaultBtn>
      </ButtonStyle>
    </Wrapper>
  );
};

export default Mix;

const HeadContent = styled.div`
  display: flex;
  flex-direction: row;
`

const Music = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 1vh;
  padding-left: 5vw;
`
const presetStyle = {
  width: 400,
  height: 250,
  border: '5px',
  borderColor: 'white',
}

const ButtonStyle = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
  // margin-top: 5px;
  padding: 15vh;
  padding-right: 6vw;
`
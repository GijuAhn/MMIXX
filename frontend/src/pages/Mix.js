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
    getPreset(1).then(
      res => setPresetData(res), console.log(presetData)
      ).catch(err => console.log(err))
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
      <Music>
        { musicSelected && (<DefaultBtn
          onClick={ () => navigate('/playlist/select') }
          >
          곡 선택
        </DefaultBtn>)}
          {/* 우측 상단에 띄워놓을 동그래미 */}
        { !musicSelected && (<div>
          <MusicInfo
            // props 보내기
            coverImage={coverImage}
            musicName={musicName}
            musicianName={musicianName}
            >
          </MusicInfo>
        </div>)}
      </Music>
      <p> 원하는 프리셋을 선택하세요. </p>
      <Carousel height={400} width={800} xOrigin={120} yOrigin={-40} yRadius={0} autoPlay={false}>
        {/* // const preset_name = props.preset_name
            // const preset_summary = props.preset_summary
            // const preset_info = props.preset_info
            const preset_image = props.preset_image */}

        {/* 컴포넌트 반복 코드 */}
        {/* {presetData.map((preset) => 
          <div key={preset.presetSeq} style={presetStyle} onClick={() => setPresetSeq(preset.presetSeq)}>
            <PresetCard
              preset_name={preset.presetName}
              preset_image={preset.presetImg}
            ></PresetCard>
          </div>
        )} */}
        <div key={1} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            preset_name='밝은'
            presetSeq={1}
          ></PresetCard>
        </div>
        <div key={2} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            preset_name='신나는'
            presetSeq={2}
          ></PresetCard>
        </div>
        <div key={3} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            preset_name='편안한'
            presetSeq={3}
          ></PresetCard>
        </div>
        <div key={4} style={presetStyle}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            preset_name='강렬한'
            presetSeq={4}
          ></PresetCard>
        </div>
        <div key={5} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            preset_name='힘있는'
            presetSeq={5}
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

const Music = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-start;
  padding-top: 5vh;
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
  padding-bottom: 2vh;
  padding-right: 6vw;
`
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { ResultCard } from "components/Mix";
import theme from "styles/theme";

import { musicMix } from "api/mix";

const MixResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState('')
  // const [responsed, setResponsed] = useState(false)
  const musicSeq = location.state && location.state.musicSeq;
  const presetSeq = location.state && location.state.presetSeq;

  useEffect(() => {
    console.log('Mix Result : ', musicSeq, presetSeq)
    musicMix({music_seq: musicSeq, preset_seq: presetSeq}).then(
      response => setResult(response.data)
    ).catch( error => console.log(error))
  }, [musicSeq, presetSeq])
  return (
    <ResultWrapper>
      <Header 
        title="MIX Result"
        desc="음악 믹스 결과"  
        />
      { !result && (
        <InProgress>
          <CircularProgress 
            style={{ alignItems: 'center', justifyContent: 'center'}}
            />
          <p>음악을 변환하고 있습니다. 잠시만 기다려주세요.</p>
        </InProgress>
      )}
      { result && (
        <ContentWrapper>
          <Original>
            <ResultCard 
              musicUrl={result.origin_music.musicUrl}
              musicName={result.origin_music.musicName}
              musicianName={result.origin_music.musicianName}
              coverImage={result.origin_music.coverImage}
            >
            </ResultCard>
          </Original>
          <Mixed>
            <ResultCard 
              musicUrl={result.mixed_music.musicUrl}
              musicName={result.mixed_music.musicName}
              musicianName={result.mixed_music.musicianName}
              coverImage={result.mixed_music.coverImage}
            >
            </ResultCard>
          </Mixed>
        </ContentWrapper>
      )}
      { result && (<DefaultBtn
        onClick={ () => navigate('/mymusic') }
      >
        확인
      </DefaultBtn>)}

    </ResultWrapper>
  )
}

export default MixResult

const ResultWrapper = styled(Wrapper)`
  background: linear-gradient(
    135deg, 
    ${theme.palette.dark} 45%, 
    // ${theme.palette.secondary} 75%, 
    ${theme.palette.light} 100%);
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 75vh;
`
const Original = styled(ContentWrapper)`
  align-items: start;
  justify-content: flex-start;
`
const Mixed = styled(ContentWrapper)`
  align-items: end;
  justify-content: flex-end;
`
const InProgress = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 75vh;
  align-items: center;
  justify-content: center;
`
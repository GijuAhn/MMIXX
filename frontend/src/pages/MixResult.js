import React from "react";
import { Wrapper, Header, DefaultBtn } from "components/Common";
import { useNavigate } from "react-router-dom";
import { ResultCard } from "components/Mix";
import styled from "styled-components";
import theme from "styles/theme";

const MixResult = () => {
  const navigate = useNavigate();
  return (
    <ResultWrapper>
      <Header 
        title="MIX Result"
        desc="음악 믹스 결과"  
        />
      <Original>
        <ResultCard>
        </ResultCard>
      </Original>
      <Mixed>
        <ResultCard>
        </ResultCard>
      </Mixed>
      
      <DefaultBtn
        onClick={ () => navigate('/mymusic') }
      >
        확인
      </DefaultBtn>
    </ResultWrapper>
  )
}

export default MixResult

const ResultWrapper = styled(Wrapper)`
  background: linear-gradient(45deg ${theme.palette.darkgray} 0%, ${theme.palette.secondary} 50%, ${theme.palette.light} 100% });
`

const Original = styled.div`
  width: 400px;
  height: 300px;
  position: absolute;
  top: 9rem;
  left: 15rem;
  align-item: center;
  justify-content: flex-start;
`
const Mixed = styled.div`
  position: absolute;
  bottom: 13vh;
  right: 5vw;
  align-item: center;
  justify-content: flex-end;
`
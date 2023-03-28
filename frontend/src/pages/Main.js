import React, { useEffect } from 'react';
import styled from 'styled-components'
import AOS from "aos";
import "aos/dist/aos.css";

import { Wrapper, DefaultBtn } from 'components/Common';
import Footer from 'components/Common/Footer';

const Main = () => {

  useEffect(() => {
    AOS.init()
  })

  return (
    <StyleWrapper>
      <First data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        MUSIC<br />
        MIXING<br />
        FOR WHOLE NEW EXPERIENCE<br />
      </First>
      <First data-aos="fade-up-right" data-aos-duration="1000" data-aos-anchor-placement="top-center">
        임시 텍스트 <br />
        임시텍스트 두 번째 줄<br />
      </First>
      <First data-aos="fade-up-left" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        임시 텍스트 <br />
        임시텍스트 두 번째 줄<br />
      </First>
      {/* <First data-aos="slide-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        임시 텍스트 <br />
        임시텍스트 두 번째 줄<br />
      </First> */}
      <First>
        <DefaultBtn width="150px" 
          data-aos="zoom-in-up" 
          data-aos-duration="1000" 
          data-aos-anchor-placement="bottom-bottom">
            시작해보기
        </DefaultBtn>
      </First>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  flex-direction: column;
  height: calc(${({ children }) => {
    const childCount = React.Children.count(children);
    // 모든 자식 요소의 높이를 합산한 값에 60px를 더한 결과를 반환합니다.
    return `100% / ${childCount} * ${childCount} + 60px`;
  }});
  > div {
    height: 80vh;
  }

  > div:first-child {
    margin-top: 50px;
  }

  > div:last-child {
    height: 500px;
  }
`

const First = styled.div`
  font-size: 100px;
  font-weight: 900;
  text-align: center;
`


export default Main;
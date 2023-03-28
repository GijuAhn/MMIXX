import { useEffect } from 'react';
import styled from 'styled-components'
import AOS from "aos";
import "aos/dist/aos.css";

import { Wrapper } from 'components/Common';

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
      <First data-aos="slide-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        MUSIC MAKE 어쩌꾸
      </First>
      <First data-aos="slide-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        MUSIC MAKE 어쩌꾸
      </First>
      <First data-aos="slide-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        MUSIC MAKE 어쩌꾸
      </First>
      <First data-aos="slide-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        MUSIC MAKE 어쩌꾸
      </First>
      
      {/* <div style={{ border: '1px solid red'}} >
        MUSIC 
      </div> */}
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  flex-direction: column;

  > div {
    height: 500px;
  }
`

const First = styled.div`
  border: 1px solid red;
  font-size: 50px;
  font-weight: 800;
`

export default Main;
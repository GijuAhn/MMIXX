// import styled from 'styled-components'
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

import { Wrapper } from 'components/Common';

const Main = () => {

  useEffect(() => {
    AOS.init()
  })

  return (
    <Wrapper>
      <div style={{ border: '1px solid red'}} data-aos="slide-up" data-aos-duration="3000" data-aos-anchor-placement="bottom-bottom">
        asdfasdf
      </div>
    </Wrapper>
  );
};

// const MainBody = styled.div`
//   width: 100%;
//   height: 100vh;
//   background-color: ${({ theme }) => theme.palette.darkAlt }
// `

export default Main;
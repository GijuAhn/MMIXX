// import styled from 'styled-components'
import { Wrapper } from 'components/Common';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Main = () => {

  useEffect(() => {
    AOS.init()
  })
  
  return (
    <Wrapper>
      <div style={{ border: '1px solid red'}} data-aos="fade-up">
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
import { Wrapper } from 'components/Common';
import styled from 'styled-components'
import { useRecoilState } from 'recoil';

import Remix from 'assets/music/NewJeans-Future Funk Remix.mp3';
import { nowPlaying } from 'atom/music';

const Test = () => {
  const audioElement = new Audio(Remix)
  const [ atomTest, setAtomTest ] = useRecoilState(nowPlaying)

  const playAudio = () => {
    audioElement.play();
  }
  
  const changeAtomValueTest = () => {
    setAtomTest(atomTest + 1)
    console.log(atomTest) 
  }

  // setInterval(() => {
  //   console.log(audioElement.duration)
  //   console.log(audioElement.currentTime)
  // }, 1000)

  return (
    <Wrapper style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80')"}}>
      <button style={{ color: 'red'}} onClick={() => playAudio()}>
        {Remix}
      </button>
      <button onClick={changeAtomValueTest}>
        recoil 테스트용 
      </button>
      <TestDiv />
    </Wrapper>
  )
}

const TestDiv = styled.div`
  position: fixed;

  width: 300px;
  height: 300px;
  // border: 1px solid red;
  backdrop-filter: blur(10px);
`

export default Test;
import { Wrapper } from 'components/Common';
// import styled from 'styled-components'
// import Retro from 'assets/music/NewJeans-Retro.mp3';
import Remix from 'assets/music/NewJeans-Future Funk Remix.mp3';
import { useRecoilState } from 'recoil';
import { test } from 'atom/atom';
import { testPlaying } from 'atom/music';

const Test = () => {
  const audioElement = new Audio(Remix)
  const [ atomTest, setAtomTest ] = useRecoilState(testPlaying)

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
    <Wrapper>
      <button style={{ color: 'red'}} onClick={() => playAudio()}>
        {Remix}
      </button>
      <button onClick={changeAtomValueTest}>
        recoil 테스트용 
      </button>
    </Wrapper>
  )
}

// const Audio = styled.audio`
//   display: block;
//   background-color: yellow;
//   border-radius: 3px;
// `

export default Test;
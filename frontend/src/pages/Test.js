import { useEffect } from 'react'
import styled from 'styled-components'

import { Wrapper } from 'components/Common'
import { usePlayControl } from 'hooks/usePlayControl';
import { useRecoilValue } from 'recoil';
import { nowPlayingSelector, playlistQueue } from 'atom/music';

const Test = () => {
  const testData = useRecoilValue(playlistQueue)
  const testData2 = useRecoilValue(nowPlayingSelector)

  console.log('테스트중....', testData2)

  // console.log('테스트', playlist, '1')
  // setInterval(() => {
  //   console.log(audioElement.duration)
  //   console.log(audioElement.currentTime)
  // }, 1000)

  return (
    <Wrapper style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80')"}}>
      <button style={{ color: 'red'}} onClick={usePlayControl({
        sequence: 2,
        data: testData
      })}>
        <h1>노래 재생 테스트</h1>
      </button>
      <button>
      </button>
      <TestDiv />
    </Wrapper>
  )
}

const TestDiv = styled.div`
  position: fixed;
  top: 300px;
  width: 300px;
  height: 300px;
  // border: 1px solid red;
  backdrop-filter: blur(10px);
`

export default Test;
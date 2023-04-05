import PlaySlider from './PlaySlider'
import styled from 'styled-components'
import { PlayIcons } from '.'
import { useRecoilValue } from 'recoil'
import { _now } from 'atom/music'

const PlayControl = () => {
  const audioState = useRecoilValue(_now)
  return (
    <Wrapper>
      <PlayIcons width="50%"/>
      <PlaySlider audioState={audioState}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-direction: column;
  width: 700px;
`

export default PlayControl;
import PlaySlider from './PlaySlider'
import styled from 'styled-components'
import { PlayIcons } from '.'

const PlayControl = () => {
  return (
    <Wrapper>
      <PlayIcons width="50%"/>
      <PlaySlider />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-direction: column;
  width: 700px;
`

export default PlayControl;
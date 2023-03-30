import PlaySlider from './PlaySlider'
import styled from 'styled-components'
import { PlayIcons } from '.'

const PlayControl = () => {
  return (
    <Wrapper>
      <PlayIcons />
      <PlaySlider />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-direction: column;
`

export default PlayControl;
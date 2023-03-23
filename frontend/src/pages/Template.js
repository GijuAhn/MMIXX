import { NavBar } from 'components/NavBar'
import { PlayBar } from 'components/PlayBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Template = () => {
  return (
    <Wrapper>
      <Side>
        <NavBar />
      </Side>
      <Outlet />
      <PlayBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(1000px, 1fr);
`

const Side = styled.div`
  border: 2px dotted orange;
`

export default Template;
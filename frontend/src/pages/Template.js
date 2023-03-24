import { NavBar } from 'components/NavBar'
import { PlayBar } from 'components/PlayBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Template = () => {
  return (
    <Wrapper>
      <NavBar />
      <Outlet />
      <PlayBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

export default Template;
import { NavBar } from 'components/NavBar'
import { PlayBar } from 'components/PlayBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Template = () => {
  return (
    <Wrapper>
      <StyledNavBar />
      <Outlet />
      <PlayBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  // display: flex;
`

const StyledNavBar = styled(NavBar)`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`

export default Template;
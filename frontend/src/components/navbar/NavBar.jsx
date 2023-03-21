import styled from 'styled-components'

const NavBar = () => {
  return (
    <Nav>
      <h2>NavBar</h2>
      <ProfileDiv />
    </Nav>
  )
}

const Nav = styled.nav`
  width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.dark };
  float: left;
`

const ProfileDiv = styled.div`

`

export default NavBar;
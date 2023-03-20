import styled from 'styled-components'

const NavBar = () => {
  return (
    <Nav>
      <h2>NavBar</h2>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.dark };
  float: left;
`

export default NavBar;
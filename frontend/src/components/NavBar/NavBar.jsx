import { Avatar } from '@mui/material'
import { StyleLink } from 'components/Common'
import styled from 'styled-components'


const NavBar = () => {
  return (
    <Nav>
      <NavAvatar 
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        sx={{ width: 150, height: 150 }}
      />
      <StyleLink to="mix">
        Mix 로 이동하기
      </StyleLink>
      <StyleLink to="playlist">
        playlist으로 이동하기
      </StyleLink>
      <StyleLink to="mymusic">
        Mymusic으로 이동하기
      </StyleLink>
      <LogoutBtn>
        로그아웃
      </LogoutBtn>
      {/* <ProfileDiv /> */}
    </Nav>  
  )
}

const Nav = styled.nav`
  width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.dark };
  float: left;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const NavAvatar = styled(Avatar)`
  margin: 20px;
`

const LogoutBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.dark };
  border: none;
  position: fixed;
  bottom: 0;
  padding: 20px 0;

  &: hover {
    color: red;
    cursor: pointer;
  }
`

export default NavBar;

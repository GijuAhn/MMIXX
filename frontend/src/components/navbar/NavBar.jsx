import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from 'assets/logo.png'

const NavBar = () => {
  return (
    <Nav>
      <h2>NavBar</h2>
      <image src={logo} />
      <Avatar 
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        sx={{ width: 150, height: 150 }}
      />
      <Link to="mix">
        Mix로 이동하기
      </Link>
      <Link to="playlist">
        playlist으로 이동하기
      </Link>
      <Link to="mymusic">
        Mymusic으로 이동하기
      </Link>
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

// const ProfileDiv = styled.div`
//   border: 1px solid blue;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
// `

const LogoutBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.dark };
  border: none;
  
  &: hover {
    color: red;
    cursor: pointer;
  }
`

export default NavBar;
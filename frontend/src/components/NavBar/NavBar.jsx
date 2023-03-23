import { Avatar } from '@mui/material'
import styled, { css } from 'styled-components'
import { useLocation, Link } from 'react-router-dom'

import { PlainBtn } from 'components/Common'


const NavBar = () => {
  const location = useLocation();
  const navList = [
    {name: '믹스하기', path: 'mix'},
    {name: '플레이리스트', path: 'playlist'},
    {name: '내 음악 보기', path: 'mymusic'},
  ]

  return (
    <Nav>
      <NavProfile>
        <NavAvatar 
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          sx={{ width: 150, height: 150 }}
        /> 
        <p>
          프로필 사진
        </p>
      </NavProfile>

      <NavList>
        {navList && navList.map((item, idx) => {
          return (
            <NavItem key={idx} to={item.path}>
              <NavBtn selected={location.pathname.split('/') === item.path }>
                {item.name}
              </NavBtn>
            </NavItem>
          )
        })}
      </NavList>
      <LogOut>
        로그아웃
        {/* <PlainBtn>
          로그아웃
        </PlainBtn> */}
      </LogOut>
    </Nav>  
  )
}

const Nav = styled.nav`
  width: 200px;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.dark };
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  float: left;
  justify-content: space-between;
`

const NavProfile = styled.div`
  flex-direction: column;

`

const NavAvatar = styled(Avatar)`
  margin: 20px;
`

const NavList = styled.div`
  height: 55%;
  flex-direction: column;
  justify-content: start;
`

const NavItem = styled(Link)`
  width: 100%;
  text-align: center;
`

const NavBtn = styled.button`
  text-decoration: none;
  background-color: ${({ theme }) => theme.palette.dark};
  color: ${({ theme }) => theme.palette.light};
  padding: 10px 20px;
  border: 2px solid ${({theme}) => theme.palette.secondary};
  border-radius: 27px;
  margin: 5px 0px;
  width: 90%;
  font-weight: 500;
  font-size: 14px;
  height: 40px;
  line-height: 100%;
  text-align: left;

  ${({ selected, theme }) => {
    selected &&
    css`
      background-color: ${theme.palette.secondary};
      color: red;
    `
  }};

  &: hover {
    background-color: ${({ theme }) => theme.palette.secondary};
    color: ${({ theme }) => theme.palette.dark};
  }
`

const LogOut = styled.div`
`

export default NavBar;

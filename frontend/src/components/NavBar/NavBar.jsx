import { Avatar } from '@mui/material'
import styled from 'styled-components'
import { useLocation, Link } from 'react-router-dom'

import { PlainBtn } from 'components/Common'


const NavBar = () => {
  const location = useLocation();
  const navList = [
    {name: 'MIX', path: 'mix'},
    {name: 'PLAYLIST', path: 'playlist'},
    {name: 'MY MUSIC', path: 'mymusic'},
  ] 

  return (
    <Wrapper>
      <NavProfile>
        <NavAvatar 
          src=''
          sx={{ width: 100, height: 100 }}
        />  
        <p>
          사용자 이름
        </p>
      </NavProfile>
      <NavList>
        {navList && navList.map((item, idx) => {
          return (
            <NavItem key={idx} to={item.path}>
              <NavBtn selected={'/' + item.path === location.pathname}>
                {item.name}
              </NavBtn>
            </NavItem>
          )
        })}
      </NavList>
      <LogOut>
        <PlainBtn>
          로그아웃
        </PlainBtn>
      </LogOut> 
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.dark };
  flex-direction: column;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
`

const NavProfile = styled.div`
  flex-direction: column;
  flex-grow: 0.5;
`

const NavAvatar = styled(Avatar)`
  margin-bottom: 15px;
`

const NavList = styled.div`
  flex-direction: column;
  justify-content: start;
  flex-grow: 4;
`

const NavItem = styled(Link)`
  width: 100%;
  text-align: center;
  text-decoration: none;
`

const NavBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.dark};
  color: ${({ theme }) => theme.palette.light};
  padding: 10px 20px;
  border: 1.6px solid ${({theme}) => theme.palette.secondary};
  border-radius: 27px;
  margin: 5px auto;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
  height: 40px;
  text-align: left;
  font-family: 'Heebo', sans-serif;
  display: flex;
  align-items: center;

  ${({ selected, theme }) => 
    selected &&`
      background-color: ${theme.palette.secondary};
      color: ${theme.palette.dark};
    `
  };


  &: hover {
    background-color: ${({ theme }) => theme.palette.secondary};
    color: ${({ theme }) => theme.palette.dark};
  }
`

const LogOut = styled.div`
  align-self: end;
  flex-grow: 0.5;
`

export default NavBar;

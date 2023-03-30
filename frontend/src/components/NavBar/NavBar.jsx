import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { DefaultBtn, PlainBtn } from "components/Common";
import { handleLogin } from "api/base";
import logo from "assets/logo.png";
import MusicCount from "components/mymusic/MusicCount";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navList = [
    { name: "MIX", path: "mix" },
    { name: "PLAYLIST", path: "playlist" },
    { name: "MY MUSIC", path: "mymusic" },
  ];

  const isLogin = true;

  const onClickLogin = () => {
    handleLogin().then((res) => console.log(res));
  };

  return (
    <Wrapper>
      <LogoImage logo={logo} onClick={() => navigate("/")} />
      {isLogin ? (
        <>
          <NavProfile>
            <NavAvatar src="" sx={{ width: 100, height: 100 }} />
            <p>사용자 이름</p>
          </NavProfile>
          <NavList>
            {navList &&
              navList.map((item, idx) => {
                return (
                  <NavItem key={idx} to={item.path}>
                    <NavBtn selected={"/" + item.path === location.pathname}>
                      {item.name}
                      {item.name === "MY MUSIC" ? "[아이콘]" : null}
                    </NavBtn>
                  </NavItem>
                );
              })}
            {location.pathname === "/mymusic" ? (
              <MusicCount></MusicCount>
            ) : null}
          </NavList>
          <LogOut>
            <PlainBtn>로그아웃</PlainBtn>
          </LogOut>
        </>
      ) : (
        <LoginWrapper>
          <DefaultBtn width="150px" onClick={onClickLogin}>
            로그인 하기
          </DefaultBtn>
        </LoginWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.dark};
  flex-direction: column;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: ${({ isLogin }) => !isLogin && "start"};
`;

const LogoImage = styled.div`
  background-image: url(${logo});
  background-size: cover;
  width: 50px;
  height: 50px;
  margin: 10px auto 0;
  cursor: pointer;
`;

const NavProfile = styled.div`
  flex-direction: column;
  flex-grow: 0.5;
`;

const NavAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const NavList = styled.div`
  flex-direction: column;
  justify-content: start;
  flex-grow: 4;
`;

const NavItem = styled(Link)`
  width: 100%;
  text-align: center;
  text-decoration: none;
`;

const NavBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.dark};
  color: ${({ theme }) => theme.palette.light};
  padding: 10px 20px;
  border: 1.3px solid ${({ theme }) => theme.palette.secondary};
  border-radius: 27px;
  margin: 5px auto;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
  height: 40px;
  text-align: left;
  font-family: "Heebo", sans-serif;
  display: flex;
  align-items: center;

  ${({ selected, theme }) =>
    selected &&
    `
      background-color: ${theme.palette.secondary};
      color: ${theme.palette.dark};
    `};

  &: hover {
    background-color: ${({ theme }) => theme.palette.secondary};
    color: ${({ theme }) => theme.palette.dark};
  }
`;

const LogOut = styled.div`
  align-self: end;
  flex-grow: 0.5;
`;

const LoginWrapper = styled.div``;
export default NavBar;

import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const MusicCount = () => {
  const navigate = useNavigate();

  const onClickMine = () => {
    navigate(`/comment/id/등등 내가 원하는 주소`);
  };

  const onClickGlobal = () => {
    navigate(`/comment/id/등등 내가 원하는 주소`);
  };

  const onClickFav = () => {
    navigate(`/comment/id/등등 내가 원하는 주소`);
  };
  return (
    <Table>
      <tbody>
        <Tr>
          <Td onClick={onClickMine}>내 플레이리스트</Td>
        </Tr>
        <Tr>
          <Td onClick={onClickGlobal}>글로벌 플레이리스트</Td>
        </Tr>
        <Tr>
          <Td onClick={onClickFav}>즐겨찾기</Td>
        </Tr>
      </tbody>
    </Table>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Table = styled.table`
  // position: absolute;
  // top: 400px;
  margin: 0 auto;
  height: 100px;
  width: 100%;
  // border: 1px dotted red;

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const Tr = styled.tr`
  background-color: transparent;
  height: 30px;
`;

const Td = styled.td`
  color: ${({ theme }) => theme.palette.light};
  font-size: 14px;
  font-weight: 200;
  font-family: "Heebo", sans-serif;
  border-radius: 15px;
  padding-left: 10px;

  &: hover {
    background-color: ${({ theme }) => theme.palette.hover};
    cursor: pointer;
  }
`;

export default MusicCount;

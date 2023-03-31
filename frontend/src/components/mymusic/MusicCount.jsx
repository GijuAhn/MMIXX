import { useState, useEffect } from "react";
import { countMusic } from "api/mymusic";
import styled, { keyframes } from "styled-components";

const MusicCount = () => {
  const [allCnt, setAllCnt] = useState(0);
  const [mixedCnt, setMixedCnt] = useState(0);
  const [instCnt, setInstCnt] = useState(0);

  useEffect(() => {
    countMusic({ userSeq: 1 }).then(({ data }) => {
      setAllCnt(data.allCnt);
      setMixedCnt(data.mixedCnt);
      setInstCnt(data.instCnt);
    });
  }, []);

  return (
    <Table>
      <Tr>
        <Td>내가 업로드한 곡</Td>
        <Cnt>{allCnt}</Cnt>
      </Tr>
      <Tr>
        <Td>내가 믹스한 곡</Td>
        <Cnt>{mixedCnt}</Cnt>
      </Tr>
      <Tr>
        <Td>내가 추출한 Inst??...?</Td>
        <Cnt>{instCnt}</Cnt>
      </Tr>
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
  position: absolute;
  top: 390px;
  width: 75%;
  // border: 1px dotted red;

  animation-duration: 0.15s;
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
`;

const Cnt = styled.td`
  color: ${({ theme }) => theme.palette.light};
  font-size: 14px;
  font-family: "Heebo", sans-serif;
`;

export default MusicCount;

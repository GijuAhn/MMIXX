import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import WarningIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorrIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import SuccessIcon from "@mui/icons-material/CheckBoxOutlined";

const CustomToast = ({ icon, text = "업로드 중..." }) => {
  // const [state, setState] = useState(slideIn);
  const [state, setState] = useState(slideDown);

  useEffect(() => {
    let timer = setTimeout(() => {
      // props.setToastState(false);		// 3초 뒤, toastState가 false가 되면서 알림창이 사라진다
      //   let timer2 = setTimeout(()=>{
      //   }, 500)
      // setState(slideOut);
      setState(slideUp);
    }, 3000);

    return () => {
      clearTimeout(timer);
      //   clearTimeout(timer2);
    };
  }, []);

  return (
    <Toast animation={state} forUpload={true}>
      {icon === "info" ? (
        <InfoIcon color='primary' />
      ) : icon === "warning" ? (
        <WarningIcon sx={{ color: "rgb(255, 193, 7)" }} />
      ) : icon === "error" ? (
        <ErrorrIcon sx={{ color: "rgb(220, 53, 69)" }} />
      ) : (
        <SuccessIcon color='success' />
      )}
      {/* <InfoIcon color='primary' />
      <WarningIcon sx={{ color: "rgb(255, 193, 7)" }} />
      <ErrorrIcon sx={{ color: "rgb(220, 53, 69)" }} />
      <SuccessIcon color='success' /> */}
      <Text>{text}</Text>
    </Toast>
  );
};

const slideIn = keyframes`
from {
    transform: translateX(150%);
  }
  to {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(150%);
  }
`;

const slideDown = keyframes`
from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const slideUp = keyframes`
from {
    opacity: 1;
    transform: translateY(0%);
  }
  to {
    opacity: 0;
    transform: translateY(-5%);
  }
`;

const Toast = styled.div`
  background-color: ${({ theme }) => theme.palette.light};
  // border: 1px solid ${({ theme }) => theme.palette.darkgray};
  border-radius: 15px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  height: 40px;
  width: 250px;
  padding: 5px;
  text-align: center;
  //   text-align: left;
  //   display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 20px;
  right: 20px;
  ${({ forUpload }) =>
    forUpload &&
    `top: 80px;
    right: auto;
  `}

  animation: ${({ animation }) => animation} 0.5s ease-in-out 0s 1 normal
    forwards;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.palette.hover};
  font-size: 16px;
  font-weight: bold;
  font-family: "Heebo", sans-serif;
`;

export default CustomToast;

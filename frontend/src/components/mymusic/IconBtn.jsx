import { useState } from "react";
import styled, { keyframes } from "styled-components";
// import PropTypes from "prop-types";

const IconBtn = ({ icon, iconName, iconHeight = 22, fontSize, onClick }) => {
  const [isHover, setIsHover] = useState(false);
  // const onMouseEnter = () => {
  //   setIsHover(true);
  // };
  // const onMouseLeave = () => {
  //   setIsHover(false);
  // };
  const onMouseOver = () => {
    setIsHover(true);
  };
  const onMouseOut = () => {
    setIsHover(false);
  };
  return (
    <Button
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {isHover ? <IconName fontSize={fontSize}>{iconName}</IconName> : <Icon src={icon} alt='' height={iconHeight} />}
    </Button>
  );
};

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Button = styled.button`
  background: transparent;
  width: 40px;
  height: 40px;
  font-size: 12px;
  font-weight: 200;
  font-family: "Heebo", sans-serif;
  // height: 20px;
  // border: 1.1px solid transparent;
  // border-radius: 50%;
`;

const IconName = styled.div`
  font-size: ${(props) => props.fontSize || "12px"};
  font-weight: 200;
  font-family: "Heebo", sans-serif;
  animation: ${fadeIn} 0.2s linear forwards;
`;

const Icon = styled.img`
  animation: ${fadeIn} 0.2s linear forwards;
`;

// MusicIcon.propTypes = {
//   musicSeq: PropTypes.number.isRequired,
//   iconName: PropTypes.string.isRequired,
// };

export default IconBtn;

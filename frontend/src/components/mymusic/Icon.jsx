import { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";

const MusicIcon = ({ iconName, iconWidth = 30, onClick }) => {
  const icon = require(`assets/${iconName}.png`);
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
    //https://snupi.tistory.com/196
    <IconBtn
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {isHover ? (
        <span>{iconName.toUpperCase()}</span>
      ) : (
        <img src={icon} alt="" width={iconWidth} />
      )}
    </IconBtn>
  );
};

// MusicIcon.propTypes = {
//   musicSeq: PropTypes.number.isRequired,
//   iconName: PropTypes.string.isRequired,
// };
const IconBtn = styled.button`
  background: transparent;
  // width: 20px;
  // height: 20px;
  // border: 1.1px solid transparent;
  // border-radius: 50%;
`;
export default MusicIcon;

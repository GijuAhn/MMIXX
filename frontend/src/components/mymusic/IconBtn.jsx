import { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";

const IconBtn = ({ icon, iconName, iconHeight = 25, onClick }) => {
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
      {isHover ? (
        <IconName>{iconName}</IconName>
      ) : (
        <Icon src={icon} alt='' height={iconHeight} />
      )}
    </Button>
  );
};

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
  font-size: 12px;
  font-weight: 200;
  font-family: "Heebo", sans-serif;
`;

const Icon = styled.img``;

// MusicIcon.propTypes = {
//   musicSeq: PropTypes.number.isRequired,
//   iconName: PropTypes.string.isRequired,
// };

export default IconBtn;

import { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";

const IconBtn = ({ icon, iconName, iconHeight = 25, onClick }) => {
  // const [icon] = useState(require(`assets/${iconName}.png`).default);
  // const icon = require(`assets/${iconName}.png`);
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
        iconName
      ) : (
        <img src={icon} alt="" height={iconHeight} />
        // <img
        //   src={require(`assets/${iconName}.png`).default}
        //   alt=""
        //   width={iconWidth}
        // />
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

// const MusicListIcon = ({ musicSeq, icon, iconName, iconWidth = 25 }) => {
//   const [isHover, setIsHover] = useState(false);
//   // const onMouseEnter = () => {
//   //   setIsHover(true);
//   // };
//   // const onMouseLeave = () => {
//   //   setIsHover(false);
//   // };
//   const onMouseOver = () => {
//     setIsHover(true);
//   };
//   const onMouseOut = () => {
//     setIsHover(false);
//   };
//   const onClick = () => {
//     console.log(musicSeq);
//   };
//   return (
//     <IconBtn
//       // onMouseEnter={onMouseEnter}
//       // onMouseLeave={onMouseLeave}
//       onMouseOver={onMouseOver}
//       onMouseOut={onMouseOut}
//       onClick={onClick}
//     >
//       {isHover ? (
//         iconName
//       ) : (
//         <img src={icon} alt="" width={iconWidth} />
//         // <img
//         //   src={require(`assets/${iconName}.png`).default}
//         //   alt=""
//         //   width={iconWidth}
//         // />
//       )}
//     </IconBtn>
//   );
// };

// MusicIcon.propTypes = {
//   musicSeq: PropTypes.number.isRequired,
//   iconName: PropTypes.string.isRequired,
// };

export default IconBtn;

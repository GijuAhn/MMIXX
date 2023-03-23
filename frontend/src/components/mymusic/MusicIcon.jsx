import { useState, useEffect } from "react";
import playIcon from "assets/play.png";
import mixIcon from "assets/mix.png";
// import downloadIcon from "assets/download.png";
import PropTypes from "prop-types";

const MusicIcon = ({ musicSeq, iconName }) => {
  const [isHover, setIsHover] = useState(false);
  const [icon, setIcon] = useState(playIcon);
  useEffect(() => {
    // const iconObj = { play: playIcon, mix: mixIcon, download: downloadIcon };
    // const iconObj = { play: playIcon, mix: mixIcon, download: mixIcon };
    // setIcon(iconObj[iconName]);
    // const iconList = [['play', playIcon], ['mix', mixIcon], ['download', downloadIcon]];
    const iconList = [
      ["play", playIcon],
      ["mix", mixIcon],
      ["download", mixIcon],
    ];
    for (const v of iconList) {
      if (v[0] === iconName) {
        setIcon(v[1]);
        break;
      }
    }
  }, []);
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
  const onClick = () => {
    console.log("...click icon");
    console.log("...icon name =", iconName);
    console.log("...music seq =", musicSeq);
  };
  return (
    //https://snupi.tistory.com/196
    <button
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {isHover ? <div>{iconName}</div> : <img src={icon} alt=""></img>}
    </button>
  );
};

MusicIcon.propTypes = {
  musicSeq: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default MusicIcon;

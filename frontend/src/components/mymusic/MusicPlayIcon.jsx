import { useState } from "react";
import Icon from "./Icon";

const MusicPlayIcon = ({ musicSeq }) => {
  const onClick = () => {
    console.log(musicSeq);
  };

  return <Icon onClick={onClick} iconName="play"></Icon>;
};
export default MusicPlayIcon;

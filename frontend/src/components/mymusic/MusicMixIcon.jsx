import { useState } from "react";
import Icon from "./Icon";

const MusicMixIcon = ({ musicSeq }) => {
  const onClick = () => {
    console.log(musicSeq);
  };
  return <Icon onClick={onClick} iconName="mix"></Icon>;
};
export default MusicMixIcon;

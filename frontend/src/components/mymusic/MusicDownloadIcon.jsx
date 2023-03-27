import { useState } from "react";
import Icon from "./Icon";

const MusicDownloadIcon = ({ musicSeq }) => {
  const onClick = () => {
    console.log(musicSeq);
  };

  return <Icon onClick={onClick} iconName="download"></Icon>;
};
export default MusicDownloadIcon;

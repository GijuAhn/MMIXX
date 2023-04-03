import IconBtn from "./IconBtn";
import ExtractIcon from "assets/extract.png";
import { splitMusic } from "api/mymusic";

const MusicExtractIcon = ({ musicSeq }) => {
  const onClick = () => {
    console.log(musicSeq);
    splitMusic(musicSeq).then((response) => {
      console.log(response);
    });
  };

  return (
    <IconBtn onClick={onClick} icon={ExtractIcon} iconName='Inst.'></IconBtn>
  );
};

export default MusicExtractIcon;

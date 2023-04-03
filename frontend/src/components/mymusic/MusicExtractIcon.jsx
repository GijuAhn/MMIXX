import IconBtn from "./IconBtn";
import ExtractIcon from "assets/extract.png";

const MusicExtractIcon = ({ musicSeq }) => {
  const onClick = () => {
    console.log(musicSeq);
  };

  return (
    <IconBtn onClick={onClick} icon={ExtractIcon} iconName="EXTRACT"></IconBtn>
  );
};

export default MusicExtractIcon;

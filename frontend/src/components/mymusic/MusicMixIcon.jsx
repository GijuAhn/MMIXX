import IconBtn from "./IconBtn";
import MixIcon from "assets/mix.png";

const MusicMixIcon = ({ musicSeq }) => {
  const onClick = () => {
    console.log(musicSeq);
  };

  return <IconBtn onClick={onClick} icon={MixIcon} iconName="MIX"></IconBtn>;
};

export default MusicMixIcon;

import { useState } from "react";
import styled from "styled-components";
import MusicUploadModal from "./MusicUploadModal";

const MusicUploadBtn = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const onClick = () => {
    console.log("click!");
    setModalDisplay(true);
  };
  const onClickModalClose = () => {
    console.log("close!");
    setModalDisplay(false);
  };
  return (
    <div>
      <Button onClick={onClick}>[업로드]</Button>
      {modalDisplay ? (
        <MusicUploadModal onClick={onClickModalClose}></MusicUploadModal>
      ) : null}
    </div>
  );
};

const Button = styled.button`
  background: transparent;
`;

export default MusicUploadBtn;

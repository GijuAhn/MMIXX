import { useState } from "react";
import FillBtn from "./FillBtn";
import { DefaultBtn } from "components/Common";
import styled from "styled-components";
import { registMusic } from "api/mymusic";

const MusicUploadBtn = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const onClick = () => {
    setModalDisplay(true);
  };
  const onClickCloseModal = () => {
    setModalDisplay(false);
  };
  const [files, setFiles] = useState([]);
  const onChange = (event) => {
    // console.log(event.target.files);
    // console.log(event.target.files[0]);
    setFiles(event.target.files);
  };
  const uploadFile = () => {
    if (files.length > 10) {
      alert("10개 이상 못 올리게...?");
      return;
    }
    const formData = new FormData();
    const user = { userSeq: 1 };
    const config = { headers: { "content-type": "multipart/form-data" } };
    for (let i = 0; i < 5; i++) {
      formData.append("files", files[i]);
    }
    formData.append(
      "user",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );
    registMusic(formData, config)
      .then((response) => {
        console.log(response);
      })
      .then(setFiles([]));
  };
  return (
    <Div>
      <DefaultBtn onClick={onClick} width="110px">
        곡 업로드
      </DefaultBtn>
      {modalDisplay ? (
        <DivModal>
          <Modal>
            <div>
              <input type="file" multiple onChange={onChange} />
            </div>
            <FillBtn onClick={onClickCloseModal}>취소</FillBtn>
            <FillBtn onClick={uploadFile}>업로드</FillBtn>
          </Modal>
        </DivModal>
      ) : null}
    </Div>
  );
};
const Div = styled.div`
  // margin-left = 40px;
`;
const DivModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
`;

const Modal = styled.div`
  display: block;
  background: rgba(255, 255, 255);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 400px;
  height: 500px;
  position: relative;
  top: -100px;
  padding: 10px;
`;
export default MusicUploadBtn;

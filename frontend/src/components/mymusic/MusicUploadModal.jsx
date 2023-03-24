import { useState } from "react";
import styled from "styled-components";
import { registMusic } from "api/mymusic";

const MusicUploadModal = ({ onClick }) => {
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
      <Modal>
        <div>
          <h2>모달</h2>
        </div>
        <div>
          <input type="file" multiple onChange={onChange} />
          <UploadBtn onClick={uploadFile}>업로드하기!!</UploadBtn>
        </div>
        <CloseBtn onClick={onClick}>X</CloseBtn>
      </Modal>
    </Div>
  );
};

const Div = styled.div`
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
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Modal = styled.div`
  background: rgba(69, 139, 197, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 400px;
  height: 500px;
  position: relative;
  top: -100px;
  padding: 10px;
`;

const CloseBtn = styled.button`
  display: inline;
  float: right;
  padding-right: 10px;
  cursor: pointer;
  text-shadow: 1px 1px 2px gray;
  color: white;
`;
const UploadBtn = styled.button`
  display: inline;
  float: right;
  padding-right: 10px;
  cursor: pointer;
  text-shadow: 1px 1px 2px gray;
  color: white;
`;
export default MusicUploadModal;

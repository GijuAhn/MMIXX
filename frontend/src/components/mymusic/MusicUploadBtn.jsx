import { useState, useRef, useEffect } from "react";
import { DefaultBtn } from "components/Common";
import styled from "styled-components";
import { uploadMusic } from "api/mymusic";
import upload from "assets/upload.png";
import musicFile from "assets/music-file.png";
import cancel from "assets/cancel.png";
import { useRecoilValue } from "recoil";
import { userInfo } from "atom/atom";
import CustomToast from "./CustomToast";
import CircularProgress from "@mui/material/CircularProgress";

const MusicUploadBtn = () => {
  const atomUser = useRecoilValue(userInfo);
  const user = atomUser ? JSON.parse(localStorage.getItem("user")) : null;

  const wrapperRef = useRef(null);
  const input = useRef(null);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [fileList, setFileList] = useState([]);
  // const [fileNameList, setFileNameList] = useState([]);
  useEffect(() => {
    function onClickOutside(event) {
      if (!modalDisplay) return;
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        console.log("Clicked outside the wrapper");
        onClickCloseModal();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalDisplay]);
  const onClick = () => {
    setModalDisplay(true);
  };
  const onClickCloseModal = () => {
    setModalDisplay(false);
    setFileList([]);
  };
  const onClickFileCancel = (event) => {
    // console.log(fileNameList);
    console.log(event.target.id);

    const fileArray = Array.from(fileList);
    fileArray.splice(event.target.id, 1);
    setFileList(fileArray);
  };

  const onChange = (event) => {
    console.log(event.target.files);
    // console.log(event.target.files[0]);
    // console.log(event.target.files[0].name);
    setFileList(event.target.files);

    // const nameList = [];
    // for (let i = 0, len = event.target.files.length; i < len; i++) {
    //   nameList.push(event.target.files[i].name);
    // }
    // setFileNameList(nameList);
  };

  const uploadFile = () => {
    console.log(fileList);
    if (fileList.length === 0) {
      // || fileNameList === 0) {
      alert("파일을 선택하세요");
      return;
    }
    if (fileList.length > 10) {
      // TODO: 개수 제한 두기...??
      alert("10개 이하만 선택하세요");
      return;
    }
    const formData = new FormData();
    const userInfo = { userSeq: user ? user.userSeq : 0 };
    // const config = { headers: { "content-type": "multipart/form-data" } };
    for (let i = 0, len = fileList.length; i < len; i++) {
      formData.append("files", fileList[i]);
    }
    formData.append("user", new Blob([JSON.stringify(userInfo)], { type: "application/json" }));
    uploadMusic(formData)
      .then((response) => {
        console.log(response);
      })
      .then(setFileList([]))
      .catch((error) => {
        // console.log(error);
        // if (error.response.status === 413) {
        //   console.log('파일 용량 초과');
        // } else if (error.response.status === 415) {
        //   console.log('지원하지 않는 확장자');
        // }
      });
  };
  return (
    <div>
      <DefaultBtn onClick={onClick} width='110px'>
        곡 업로드
      </DefaultBtn>
      {modalDisplay ? (
        <DivModal>
          <Modal ref={wrapperRef}>
            {fileList.length === 0 ? (
              <DivUpload
                cursor='pointer'
                onClick={() => {
                  input.current?.click();
                }}
              >
                <DivText>
                  <img src={upload} width='85' alt=''></img>
                  <Text>
                    <U>이곳을 클릭</U>하여 파일을 업로드하세요
                  </Text>
                </DivText>
              </DivUpload>
            ) : (
              <DivUpload cursor='default'>
                <table>
                  <tbody>
                    {Array.from(fileList).map((file, index) => (
                      <Tr key={index}>
                        <td>
                          <img src={musicFile} width='25' alt='' />
                        </td>
                        <Td>{file.name}</Td>
                        <td>
                          <ButtonCancel onClick={onClickFileCancel}>
                            <img id={index} src={cancel} width='20' alt='' />
                          </ButtonCancel>
                        </td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </DivUpload>
            )}
            <input
              ref={input}
              type='file'
              style={{ display: "none" }}
              multiple
              onChange={onChange}
            />
            <div>
              <Button onClick={onClickCloseModal} outline width='100px'>
                취소
              </Button>
              <Button onClick={uploadFile} width='100px'>
                업로드
              </Button>
              <Loading>
                <CircularProgress size='1.8rem' sx={{ color: "rgb(29, 33, 35)" }} />
              </Loading>
            </div>
          </Modal>
        </DivModal>
      ) : null}
    </div>
  );
};

const DivModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex; //
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
`;

const Modal = styled.div`
  display: block;
  text-align: center;
  background: rgba(255, 255, 255);
  box-shadow: 0 8px 32px 0 rgba(20, 20, 20, 0.37);
  // backdrop-filter: blur(13.5px);
  // -webkit-backdrop-filter: blur(13.5px);
  border-radius: 20px;
  // border: 1px solid rgba(255, 255, 255, 0.18);
  width: 625px;
  height: 445px;
  // position: relative;
  // top: -30px;
  // right: auto;
  // left: 200px;
  margin-top: -80px;
  margin-left: 200px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
  // flex-direction: column;
`;

const DivUpload = styled.div`
  background-color: ${({ theme }) => theme.palette.light};
  width: 550px;
  height: 300px;
  height: 330px;
  margin: 37px auto auto auto; // margin 상 우 하 좌
  border: 2px dashed ${({ theme }) => theme.palette.dark};
  border-radius: 10px;
  &: hover {
    cursor: ${(props) => props.cursor};
  }
`;
const DivText = styled.div`
  display: block;
  text-align: center;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.palette.dark};
  font-size: 16px;
  font-weight: bold;
  font-family: "Heebo", sans-serif;
  padding-top: 10px;
`;

const U = styled.u`
  color: ${({ theme }) => theme.palette.dark};
  font-size: 16px;
  font-weight: bold;
  font-family: "Heebo", sans-serif;
`;

const Tr = styled.tr`
  margin: 5px auto 5px auto;
`;

const Td = styled.td`
  color: ${({ theme }) => theme.palette.dark};
  font-size: 14px;
  font-weight: 300;
  font-family: "Heebo", sans-serif;
  text-align: left;
  width: 300px;
  padding-left: 3px;
`;

const ButtonCancel = styled.section`
  background-color: transparent;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  &: hover {
    background-color: rgb(209, 211, 212);
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.light};
  color: ${({ theme }) => theme.palette.dark};
  padding: 10px 20px;
  border: 3px solid ${({ theme }) => theme.palette.light};
  border-radius: 27px;
  font-size: 14px;
  font-weight: 300;
  font-family: "Heebo", sans-serif;
  width: ${({ width }) => (width ? width : "auto")};

  margin: 15px 10px auto 10px;
  transition: border 0.1s ease-in-out;
  // &:hover {
  //   border: 3px solid ${({ theme }) => theme.palette.darkgray};
  // }

  ${({ outline }) =>
    outline &&
    `
    background-color: transparent;
  `}
`;

const Loading = styled.div`
  background-color: ${({ theme }) => theme.palette.light};
  padding: 10px 20px;
  border: 3px solid ${({ theme }) => theme.palette.light};
  border-radius: 27px;
  width: 100px;
  height: 45px;
  margin: 15px 10px auto 10px;
`;

export default MusicUploadBtn;

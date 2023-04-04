import IconBtn from "./IconBtn";
import ExtractIcon from "assets/extract.png";
import { splitMusic } from "api/mymusic";
import CustomToast from "./CustomToast";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const MusicExtractIcon = ({ musicSeq }) => {
  const [loading, setLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);

  const onClick = () => {
    console.log(musicSeq);

    setLoading(true);
    setToastInfo(true);

    splitMusic(musicSeq)
      .then((response) => {
        console.log(response);

        setToastSuccess(true);
      })
      .catch((error) => {
        // console.log(error);
        setToastError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {!loading ? (
        <IconBtn onClick={onClick} icon={ExtractIcon} iconName='Inst.' fontSize='15px'></IconBtn>
      ) : (
        <CircularProgress size='1.8rem' sx={{ color: "rgb(209, 211, 212)" }} />
      )}

      {toastInfo ? (
        <CustomToast res='info' text='보컬 제거 중...' toggle={setToastInfo} time={10000} />
      ) : null}
      {toastSuccess ? (
        <CustomToast res='success' text='보컬 제거 성공' toggle={setToastSuccess} />
      ) : null}
      {toastError ? <CustomToast res='error' text='보컬 제거 실패' toggle={setToastError} /> : null}
    </div>
  );
};

export default MusicExtractIcon;

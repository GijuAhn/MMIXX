import IconBtn from "./IconBtn";
import DownloadIcon from "assets/download.png";
// import { downloadMusic } from "api/mymusic";

const MusicDownloadIcon = ({ musicSeq }) => {
  const onClick = () => {
    // 수정. get file name 가져오고, 성공하면 다운로드.
    console.log(musicSeq);
    // downloadMusic(musicSeq).then((res) => {
    //   console.log(res);
    //   const blob = new Blob([res.data]);

    //   const fileUrl = window.URL.createObjectURL(blob);

    //   const link = document.createElement("a");
    //   link.href = fileUrl;
    //   link.style.display = "none";

    //   // const injectFilename = (res) => {
    //   //   const disposition = res.headers["content-disposition"];

    //   //   const fileName = decodeURI(
    //   //     disposition
    //   //       .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
    //   //       .replace(/['"]/g, "")
    //   //   );
    //   //   return fileName;
    //   // };
    //   // link.download = injectFilename(res);
    //   link.download = "download-file.mp3";

    //   document.body.appendChild(link);
    //   link.click();
    //   link.remove();
    // });
  };

  return (
    <IconBtn
      onClick={onClick}
      icon={DownloadIcon}
      iconName="DOWNLOAD"
    ></IconBtn>
  );
};

export default MusicDownloadIcon;

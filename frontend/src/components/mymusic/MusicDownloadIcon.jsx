import IconBtn from "./IconBtn";
import DownloadIcon from "assets/download.png";
import { downloadMusic } from "api/mymusic";
import CustomToast from "./CustomToast";

const MusicDownloadIcon = ({ musicSeq, musicName, musicUrl }) => {
  const onClick = () => {
    console.log(musicSeq, musicName, musicUrl);
    downloadMusic(musicSeq)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data]);

        const fileUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.style.display = "none";

        // const injectFilename = (res) => {
        //   const disposition = res.headers["content-disposition"];

        //   const fileName = decodeURI(
        //     disposition
        //       .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        //       .replace(/['"]/g, "")
        //   );
        //   return fileName;
        // };
        // link.download = injectFilename(res);

        let title = musicName.includes(".") ? musicName.substr(0, musicName.lastIndexOf(".")) : musicName;
        let type = musicUrl.substring(musicUrl.lastIndexOf("."), musicUrl.length).toLowerCase();

        link.download = `${title}${type}`;

        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
        } else if (error.response.status === 404) {
        }
      });
  };

  return (
    <div>
      <IconBtn onClick={onClick} icon={DownloadIcon} iconName='DOWNLOAD'></IconBtn>
      <CustomToast></CustomToast>
    </div>
  );
};

export default MusicDownloadIcon;

import { useState, useEffect, useRef } from "react";
import useDidMountEffect from "components/mymusic/useDidMountEffect";
import { getMusicList, getMusicListByCondition } from "api/mymusic";
// import MusicListItem from "./MusicListItem";
import CustomTable from "./CustomTable";
import upIcon from "assets/up-arrow.png";
import styled from "styled-components";

const MusicList = ({ filter, order, query }) => {
  const [showUpIcon, setShowUpIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noArray, setNoArray] = useState("음악 목록이 없습니다.");
  const [musicList, setMusicList] = useState([]);
  // const [musicList, setMusicList] = useState([
  //   {
  //     musicSeq: 1,
  //     coverImage: null,
  //     mixed: null,
  //     musicName: "Ditto",
  //     musicianName: "New Jeans",
  //     albumName: "앨범이름",
  //     musicLength: 36000,
  //   },
  // ]);
  // const [page, setPage] = useState(1);
  // const [isLast, setIsLast] = useState(false);
  // const [hasCondition, setHasCondition] = useState(false);
  const [scroll, setScroll] = useState(1);
  const page = useRef(1);
  const isLast = useRef(false);
  const hasCondition = useRef(false);
  useEffect(() => {
    getMusicList()
      .then((data) => {
        // console.log(data.content);
        setMusicList(data.content);
        isLast.current = data.last;
      })
      .then(() => setIsLoading(false));
  }, []);

  // const getNextPage = () => {
  //   const didMount = useRef(false);

  //   useEffect(() => {
  //     // if (didMount.current) func();
  //     // else didMount.current = true;
  //   }, []);
  // };
  // const getFirstPageByCondition = () => {
  //   const didMount = useRef(false);

  //   useEffect(() => {
  //     if (didMount.current) func();
  //     else didMount.current = true;
  //   }, deps);
  // };
  // const getNextPageByCondition = () => {
  //   const didMount = useRef(false);

  //   useEffect(() => {
  //     if (didMount.current) func();
  //     else didMount.current = true;
  //   }, deps);
  // };
  useDidMountEffect(() => {
    if (hasCondition.current) return;
    getMusicList(page.current)
      .then((data) => {
        // console.log(data.content);
        setMusicList((currentArray) => [...currentArray, ...data.content]);
        isLast.current = data.last;
      })
      .then(() => setIsLoading(false));
  }, [scroll]);
  useDidMountEffect(() => {
    console.log(`query: ${query}, filter: ${filter}, order: ${order}`);
    // setPage(1);
    page.current = 1;
    hasCondition.current = true;
    getMusicListByCondition(filter, order, query).then((data) => {
      setMusicList(data.content);
      isLast.current = data.last;
      if (data.content.length === 0) setNoArray("검색 결과가 없습니다.");
    });
  }, [filter, order, query]);

  useDidMountEffect(() => {
    if (!hasCondition.current) return;
    console.log(`query: ${query}, filter: ${filter}, order: ${order}`);
    getMusicListByCondition(filter, order, query, page.current).then((data) => {
      setMusicList((currentArray) => [...currentArray, ...data.content]);
      isLast.current = data.last;
    });
  }, [scroll]);
  // }, [page]);
  useEffect(() => {
    const onScroll = () => {
      // 기능 1. up-arrow icon 나타나기/사라지기
      if (window.scrollY > 100) {
        setShowUpIcon(true);
      } else {
        setShowUpIcon(false);
      }

      // 기능 2. 스크롤 내리면 다음 페이지 부르기
      if (isLast.current) {
        console.log("last page");
        return;
      }
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight
      ) {
        console.log("scroll down!");
        // setPage((current) => current + 1);
        page.current += 1;
        setScroll((current) => current + 1);
        // getNextPageByCondition();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      console.log("bye!");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // useDidMountEffect(() => {
  //   console.log(`query: ${query}, filter: ${filter}, order: ${order}`);
  //   getMusicListByCondition(filter, order, query).then((result) => {
  //     setMusicList(result.content);
  //     setIsLast(result.last);
  //     setHasCondition(true);
  //     if (result.content.length === 0) setNoArray("검색 결과가 없습니다.");
  //   });
  // }, [filter, order, query]);

  // const getNexPage = () => {};
  // setMusicList((currentArray) => [...currentArray, ...result.content]);

  const onClickUpIcon = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : musicList.length === 0 ? (
        <div>{noArray}</div>
      ) : (
        <CustomTable musicList={musicList}></CustomTable>
      )}
      <Button
        onClick={onClickUpIcon}
        visible={showUpIcon ? "visible" : "hidden"}
      >
        <img src={upIcon} width="55" alt=""></img>
      </Button>
    </div>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 120px;
  background-color: transparent;
  right: 30px;
  visibility: ${(props) => props.visible};
`;

export default MusicList;

import { useState } from "react";
import MusicList from "./MusicList";
import MusicSearchBar from "components/myMusic/MusicSearchBar";
import MusicSearchFilter from "components/myMusic/MusicSearchFilter";
import MusicSearchOrder from "components/myMusic/MusicSearchOrder";

const Music = () => {
  const [search, goSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("x");
  const [order, setOrder] = useState("x");
  //   useEffect(() => {
  //     getMusicList()
  //       .then((result) => {
  //         console.log(result.content);
  //         setMusicList((currentArray) => [...currentArray, ...result.content]);
  //       })
  //       .then(() => setIsLoading(false));
  //   }, []);
  return (
    <div>
      <div>
        <MusicSearchBar
          query={query}
          setQuery={setQuery}
          goSearch={goSearch}
        ></MusicSearchBar>
        <MusicSearchFilter
          filter={filter}
          setFilter={setFilter}
          goSearch={goSearch}
        ></MusicSearchFilter>
        <MusicSearchOrder
          order={order}
          setOrder={setOrder}
          goSearch={goSearch}
        ></MusicSearchOrder>
      </div>
      <MusicList
        search={search}
        filter={filter}
        order={order}
        query={query}
      ></MusicList>
    </div>
  );
};

export default Music;

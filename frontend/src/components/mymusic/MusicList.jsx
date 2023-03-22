import { useState, useEffect } from "react";
import styled from "styled-components";

const MusicList = () => {
  // if (window.location.pathname === "/mix" || window.location.pathname === "/") {
  //   return null;
  // }s
  const [loading, setLoading] = useState(true);
  const [musicList, setMusicList] = useState([]);

  useEffect(() =>
    //fetch  ... .then response
    //.then((response) => response.json())
    //.then((json) => setMusicList(json))
    {}, []); // []이면 첫 렌더링될 때 한번만
  return (
    <div>
      {loading ? <strong>Loading...</strong> : null}
      <Body>
        <h2>PlayBar</h2>
      </Body>
    </div>
  );
};

const Body = styled.div`
  width: ${(props) => window.innerWidth - 300}px;
  border: 1px solid blue;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 150px;
  filter: drop-shadow(0px -25px 100px rgba(16, 16, 16, 0.51));
`;

export default MusicList;

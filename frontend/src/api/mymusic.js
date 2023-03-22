// import base from "./base";
import axios from "axios";
// export const MUSIC_URL = "/api/music";

// export const GET_MUSIC_LIST = () => {
//   base.get(`/api/music`);
// };

export default axios.create({
  baseURL: "http://localhost:5555",
});

// import base from "./base";
import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:5555",
});

export const getMusicList = async (page = 1) => {
  const { data } = await base.get(`/api/music?page=${page}`);
  return data;
};

export const getMusicListByCondition = async (
  filter = "x",
  order = "x",
  query = "",
  page = 1
) => {
  const { data } = await base.get(
    `/api/music/search?filter=${filter}&order=${order}&query=${query}&page=${page}`
  );
  return data;
};

export const registMusic = async (data, config) =>
  await base.post(`/api/music`, data, config);

export const downloadMusic = async (fileName) => {
  const res = await base.get(`/api/music/download/${fileName}`, {
    responseType: "blob",
  });
  return res;
};

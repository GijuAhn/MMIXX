// import instance from './base'
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5555",
});
// TODO: user, return 수정하기
export const getMusicList = async (page = 1) => {
  const { data } = await instance.get(`/api/music/6?page=${page}`);
  return data;
};

export const getMusicListByCondition = async (
  filter = "x",
  order = "x",
  query = "",
  page = 1
) => {
  const { data } = await instance.get(
    `/api/music/search?filter=${filter}&order=${order}&query=${query}&page=${page}`
  );
  return data;
};

export const registMusic = async (data, config) =>
  await instance.post(`/api/music`, data, config);

export const downloadMusic = async (fileName) => {
  const res = await instance.get(`/api/music/download/${fileName}`, {
    responseType: "blob",
  });
  return res;
};

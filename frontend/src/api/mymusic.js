// import instance from './base'
import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5555/api",
  baseURL: "https://j8a403.p.ssafy.io/api",
});

const musicUrl = `/music`;

// TODO: user, return 수정하기
export const getMusicList = async ({ userSeq, page = 1 }) =>
  // await instance.get(`${musicUrl}/${userSeq}?page=${page}`);
  await instance.get(`${musicUrl}/${"5"}?page=${page}`);

export const getMusicListByCondition = async ({
  userSeq,
  filter = "",
  order = "",
  query = "",
  page = 1,
}) =>
  await instance.get(
    `${musicUrl}/search/${userSeq}?filter=${filter}&order=${order}&query=${query}&page=${page}`
  );

export const uploadMusic = async (data, config) =>
  await instance.post(`${musicUrl}`, data, config);

export const downloadMusic = async (musicSeq) => {
  const res = await instance.get(`${musicUrl}/download/${musicSeq}`, {
    responseType: "blob",
  });
  return res;
};

// export const downloadMusic = async (musicSeq) =>
//   await instance.get(`${musicUrl}/download/${musicSeq}`, {
//     responseType: "blob",
//   });

export const countMusic = async ({ userSeq }) =>
  await instance.get(`${musicUrl}/count/${userSeq}`);

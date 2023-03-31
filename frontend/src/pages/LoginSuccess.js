import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { isLogIn, userInfo } from "atom/atom";
import { useRecoilState } from "recoil";
import axios from "axios";


const LoginSuccess = () => {
    const [user, setUser] = useState('');
    
    // 현재 url 의 쿼리스트링을 변경
    const [searchParams, setSearchParams] = useSearchParams();
    
    const setSortParams = () => {
        searchParams.set('sort', 'clear');
        setSearchParams(searchParams);
    };

    // 특정한 key의 value를 가져오는 메서드, 해당 key 의 value 가 두개라면 제일 먼저 나온 value 만 리턴
    const token = searchParams.get("token");
    const seq = searchParams.get("no");

    localStorage.setItem('auth', token);
    localStorage.setItem('isLogin', 'true');
    // console.log(token);

    const instance =  axios.create({
        baseURL: process.env.REACT_APP_BASE_URL, // 서버용
        // baseURL: 'http://localhost:5555/api', // 로컬 테스트용
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })

    const getUser = async ( userSeq ) => {
        return await instance({
          url: `/user/${userSeq}`
        })
    }

    const [atomUser, setUserInfo] = useRecoilState(userInfo);
    const [isLogin, setIsLogin] = useRecoilState(isLogIn);
    useEffect(() => {
        // console.log("dddddddddd");
         getUser(seq).then(res => {
            // console.log(res.data);
            setUser(res.data);
            return res.data
         }).then(res => {
             localStorage.setItem('user', JSON.stringify(res));
             setUserInfo(res);
             setIsLogin(true);
         }).then(res => {
             window.location.href = "/"
         })

    }, []);
    

};

export default LoginSuccess;
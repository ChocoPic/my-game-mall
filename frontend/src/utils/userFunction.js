import { Route } from "react-router-dom";

// 로그인 처리 비동기 함수
export function login(id, pw) {
    return new Promise((res, rej) => {
      return setTimeout(() => {
        sessionStorage.setItem("isAuth", "true");
        return res({ resultcode: 1 });
      }, 300);
    });
  }
// 로그아웃 처리
export function logout(){
    sessionStorage.setItem("isAuth", "false");
}


////인증 처리

/*
Promise 
:자바스크립트 비동기 작업 다룰 때 쓰는 객체.
작업 완료or실패 결과를 나타낸다. 
const myPromise = new Promise((resolve, reject) => {
  // 비동기 작업 수행
  // 성공하면 resolve 호출
  // 실패하면 reject 호출
});
*/
import axios from 'axios';
import {
  AUTH_CODE,
  EMAIL_AUTH,
  GET_ALARMDATA,
  GET_ALARMLIST,
  GET_RANK,
  GET_STUDY,
  GET_PROJECT,
  GET_TECH,
  UPDATE_USER,
  DELETE_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  IDCHECK_USER,
  DETAIL_USER,
  PASSWORD_UPDATE,
  CHECK_TEAM_MEMBER,
  GET_MY_STUDY_CNT,
  GET_MY_PROJECT_CNT
} from './types';
import { USER_SERVER } from '../components/config';
import setAuthorizationToken from '../utils/setAuthorizationToken';

// 멘토 이메일인증하기
export function authCode(dataToSubmit) {
  const request = axios
    .post(`/v1/user/mentor/verification/confirm`, dataToSubmit)
    .then((response) => response.data.data);
  return {
    type: AUTH_CODE,
    payload: request
  };
}

// 멘토 이메일인증하기
export function emailAuth(dataToSubmit) {
  const request = axios
    .post(`/v1/user/mentor/verification`, dataToSubmit)
    .then((response) => response.data.data);
  return {
    type: EMAIL_AUTH,
    payload: request
  };
}

// 알림 페이지 데이터 불러오기
export function getAlarmdata(notificationSeq) {
  const request = axios
    .get(`/v1/user/notification/${notificationSeq}`)
    .then((response) => response.data);

  return { type: GET_ALARMDATA, payload: request };
}

// 알림 페이지 데이터 불러오기
export function getAlarmList() {
  const request = axios.get(`/v1/user/notification`).then((response) => response.data);

  return { type: GET_ALARMLIST, payload: request };
}

// 랭킹 페이지 데이터 불러오기
export function getRank() {
  const request = axios.get(`/v1/mentor/sort`).then((response) => response.data);
  return { type: GET_RANK, payload: request };
}

// 나의 스터디 리스트 모아보기
export function getStudy() {
  const request = axios.get('/v1/user/study').then((response) => response.data);
  return { type: GET_STUDY, payload: request };
}

// 나의 프로젝트 정보 모아보기
export function getProject() {
  const request = axios.get('/v1/user/project').then((response) => response.data);
  return { type: GET_PROJECT, payload: request };
}

// 기술스택 가져오기
export function getTech() {
  const request = axios.get('/v1/tech').then((response) => response.data.data);
  return {
    type: GET_TECH,
    payload: request
  };
}

// 유저 프로필 바꾸기
export function updateUser(dataToSubmit) {
  const request = axios.put(`/v1/user`, dataToSubmit).then((response) => response.data);

  return {
    type: UPDATE_USER,
    payload: request
  };
}

// 유저 탈퇴
export function deleteUser(dataToSubmit) {
  const request = axios
    .delete(`${USER_SERVER}/password/1`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: DELETE_USER,
    payload: request
  };
}

// 비밀번호 업데이트
export function passwordUpdate(dataToSubmit) {
  const request = axios
    .put(`/v1/${USER_SERVER}/password/1`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: PASSWORD_UPDATE,
    payload: request
  };
}

// 회원가입하기
// 연결완료, 매칭확인
export function registerUser(dataToSubmit) {
  const request = axios.post('/v1/user/signup', dataToSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

// 유저 프로필 보기
// 연결완료, 매칭 더 필요
export function detailUser() {
  const request = axios.get('/v1/user').then((response) => response.data);
  return {
    type: DETAIL_USER,
    payload: request
  };
}

// id중복확인
// 연결완료, 매칭확인
export function idcheckUser(dataToSubmit) {
  const request = axios.post(`/v1/user/idcheck`, dataToSubmit).then((response) => response.data);

  return {
    type: IDCHECK_USER,
    payload: request
  };
}

// 로그인 하기
export function loginUser(dataToSubmit) {
  const request = axios.post(`/v1/user/login`, dataToSubmit).then((response) => {
    if (response.data.accessToken) {
      const token = response.data.accessToken;
      localStorage.setItem('user', token);
      setAuthorizationToken(token);
    }
  });
  return {
    type: LOGIN_USER,
    payload: request
  };
}

// 안씀
export function auth() {
  const request = axios.get(`${USER_SERVER}/login`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

// 안씀
export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

// 내가 속해있는지 확인
export function checkTeamMember(teamSeq) {
  const request = axios.get(`/v1/member/check/${teamSeq}`).then((response) => response);
  return {
    type: CHECK_TEAM_MEMBER,
    payload: request
  };
}

export function getMyStudyCnt() {
  const request = axios.get('/v1/user/study/count').then((response) => response);
  return {
    type: GET_MY_STUDY_CNT,
    payload: request
  };
}

export function getMyProjectCnt() {
  const request = axios.get('/v1/user/project/count').then((response) => response);
  return {
    type: GET_MY_PROJECT_CNT,
    payload: request
  };
}
